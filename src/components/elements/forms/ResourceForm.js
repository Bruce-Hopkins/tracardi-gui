import React, {useEffect, useState} from "react";
import AutoComplete from "./AutoComplete";
import Button from "./Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import {v4 as uuid4} from 'uuid';
import ElevatedBox from "../misc/ElevatedBox";
import FormSubHeader from "../misc/FormSubHeader";
import FormDescription from "../misc/FormDescription";
import Columns from "../misc/Columns";
import Rows from "../misc/Rows";
import Form from "../misc/Form";
import FormHeader from "../misc/FormHeader";
import JsonEditor from "../misc/JsonEditor";
import {request} from "../../../remote_api/uql_api_endpoint";
import {connect} from "react-redux";
import {showAlert} from "../../../redux/reducers/alertSlice";


function ResourceForm({init, onClose, showAlert}) {

    if (!init) {
        init = {
            name: "",
            type: {name: "", id: ""},
            description: "",
            config: {},
            consent: false,
            enabled: false
        }
    }

    const [requiresConsent, _setRequiresConsent] = useState(init?.consent);
    const [enabledSource, setEnabledSource] = useState(init?.enabled);
    const [type, setType] = useState(init?.type);
    const [name, setName] = useState(init?.name);
    const [description, setDescription] = useState(init?.description);
    const [errorTypeMessage, setTypeErrorMessage] = useState('');
    const [errorNameMessage, setNameErrorMessage] = useState('');
    const [config, setConfig] = useState(JSON.stringify(init?.config, null, '  '));
    const [processing, setProcessing] = useState(false);
    const [credentialTypes, setCredentialTypes] = useState({});

    useEffect(() => {
        request(
            {url: "/resources/type/configuration"},
            () => {
            },
            () => {},
            (response) => {
                if (response) {
                    setCredentialTypes(response.data.result)
                }
            }
        )
    }, [])

    const setRequiresConsent = (ev) => {
        _setRequiresConsent(ev.target.checked)
    }

    const onSubmit = (payload) => {
        setProcessing(true);
        request({
                url: "/resource",
                method: "post",
                data: payload
            },
            setProcessing,
            (e) => {
                if (e) {
                    showAlert({message: e[0].msg, type: "error", hideAfter: 5000});
                }
            },
            (data) => {
                if (data) {
                    request({
                            url: '/resources/refresh'
                        },
                        setProcessing,
                        () => {
                        },
                        () => {
                            if (onClose) {
                                onClose(data)
                            }
                        }
                    )
                }
            }
        )
    }

    const setTypeAndDefineCredentialsTemplate = (type) => {
        setType(type)

        if(type?.id in credentialTypes) {
            let template = credentialTypes[type.id]
            template = JSON.stringify(template, null, '  ')
            setConfig(template)
        }
    }

    const _onSubmit = () => {

        if (!name || name.length === 0 || !type?.name) {
            if (!name || name.length === 0) {
                setNameErrorMessage("Source name can not be empty");
            } else {
                setNameErrorMessage("");
            }
            if (!type?.name) {
                setTypeErrorMessage("Source type can not be empty");
            } else {
                setTypeErrorMessage("");
            }
            return;
        }

        try {
            const payload = {
                id: (!init?.id) ? uuid4() : init.id,
                name: name,
                description: description,
                type: type.name,
                config: (config === "") ? {} : JSON.parse(config),
                consent: requiresConsent,
                enabled: enabledSource
            };
            onSubmit(payload)
        } catch (e) {
            alert("Invalid JSON in field CONFIG.")
        }
    }

    return <Form>
        <Columns>
            <FormHeader>Resource</FormHeader>
            <ElevatedBox className="Elevate">
                <FormSubHeader>Resource type</FormSubHeader>
                <FormDescription>Resource type defines soft of storage or endpoint. </FormDescription>
                <AutoComplete
                    solo={true}
                    disabled={false}
                    error={errorTypeMessage}
                    placeholder="Resource type"
                    url="/resources/type/name"
                    initValue={type}
                    onSetValue={setTypeAndDefineCredentialsTemplate}
                />

                <FormSubHeader>Consent</FormSubHeader>
                <FormDescription>Check if this resource requires user consent? Web pages
                    located in Europe require user consent to comply with GDPR. </FormDescription>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Switch
                        checked={requiresConsent}
                        onChange={setRequiresConsent}
                        name="consentRequired"
                    />
                    <span>
                            This resource requires user consent
                        </span>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Switch
                        checked={enabledSource}
                        onChange={() => setEnabledSource(!enabledSource)}
                        name="enabledSource"
                    />
                    <span>
                        This resource is enabled
                    </span>
                </div>
            </ElevatedBox>

            <FormHeader>Configuration</FormHeader>
            <ElevatedBox>
                <FormSubHeader>Credentials or Access tokens</FormSubHeader>
                <FormDescription>This json data will be an encrypted part of resource. Please pass here all the
                    credentials or access configuration information, such as hostname, port, username and password, etc.
                    This part can be empty if resource does not require authorization.</FormDescription>
                <JsonEditor value={config} onChange={setConfig}/>
            </ElevatedBox>

            <FormHeader>Description</FormHeader>
            <ElevatedBox>
                <FormSubHeader>Name</FormSubHeader>
                <FormDescription>Resource name can be any string that
                    identifies resource. Resource id is made out of rule
                    name by replacing spaces with hyphens and lowering the string
                </FormDescription>
                <TextField
                    label={"Resource name"}
                    value={name}
                    error={(typeof errorNameMessage !== "undefined" && errorNameMessage !== '' && errorNameMessage !== null)}
                    helperText={errorNameMessage}
                    onChange={(ev) => {
                        setName(ev.target.value)
                    }}
                    size="small"
                    variant="outlined"
                    fullWidth
                />

                <FormSubHeader>Description <sup style={{fontSize: "70%"}}>* optional</sup></FormSubHeader>
                <FormDescription>Description will help you to understand what a rule is
                    doing.
                </FormDescription>
                <TextField
                    label={"Rule description"}
                    value={description}
                    multiline
                    rows={3}
                    onChange={(ev) => {
                        setDescription(ev.target.value)
                    }}
                    variant="outlined"
                    fullWidth
                />

            </ElevatedBox>
        </Columns>
        <Rows style={{paddingLeft: 30}}>
            <Button label="Save"
                    onClick={_onSubmit}
                    progress={processing}
            />
        </Rows>
    </Form>
}

const mapProps = (state) => {
    return {
        notification: state.notificationReducer,
    }
};
export default connect(
    mapProps,
    {showAlert}
)(ResourceForm)