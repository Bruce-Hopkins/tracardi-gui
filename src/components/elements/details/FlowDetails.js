import React, {useEffect} from "react";
import Properties from "./DetailProperties";
import Button from "../forms/Button";
import Rows from "../misc/Rows";
import {IoGitNetworkSharp} from "react-icons/io5";
import {request} from "../../../remote_api/uql_api_endpoint";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import {useConfirm} from "material-ui-confirm";
import urlPrefix from "../../../misc/UrlPrefix";
import {useHistory} from "react-router-dom";
import FlowForm from "../forms/FlowForm";
import FormDrawer from "../drawers/FormDrawer";
import {VscTrash, VscEdit} from "react-icons/vsc";
import PropTypes from "prop-types";
import {TuiForm, TuiFormGroup, TuiFormGroupContent, TuiFormGroupField, TuiFormGroupHeader} from "../tui/TuiForm";
import FlowRules from "../../rules/FlowRules";

export default function FlowDetails({id, onDeleteComplete}) {

    const history = useHistory();

    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [displayEdit, setDisplayEdit] = React.useState(false);

    const confirm = useConfirm();

    useEffect(() => {
            setLoading(true);
            request({
                    url: '/flow/metadata/' + id,
                    method: "get"
                },
                setLoading,
                () => {
                },
                (result) => {
                    setData(result.data);
                }
            );
        },
        [id])

    const onEditClick = () => {
        if (data) {
            setDisplayEdit(true);
        }
    }

    const onEditComplete = (flowData) => {
        setData(flowData);
        setDisplayEdit(false);
    }

    const onGoToEditFlow = (id) => {
        history.push(urlPrefix("/setup/flow/edit/") + id);
    }

    const onGoToDeployedFlow = (id) => {
        history.push(urlPrefix("/setup/flow/") + id);
    }

    const onDelete = () => {
        confirm({title: "Do you want to delete this flow?", description: "This action can not be undone."})
            .then(() => {
                    request({
                            url: '/flow/' + id,
                            method: "delete"
                        },
                        () => {},
                        () => {},
                        (result) => {
                            if (result !== false) {
                                request({
                                        url: '/flows/refresh'
                                    },
                                    ()=>{},
                                    ()=>{},
                                    ()=>{
                                        if (onDeleteComplete) {
                                            onDeleteComplete(data.id)
                                        }
                                    }
                                )
                            }
                        }
                    );

                }
            )
            .catch(() => {
            })
    }

    const Details = () => <TuiForm>
        <TuiFormGroup>
            <TuiFormGroupHeader header="Workflow" description="Information on workflow"/>
            <TuiFormGroupContent>
                <TuiFormGroupField header="Data">
                    <Properties properties={data} show={["id", "name", "description", "enabled"]}/>
                    <Rows style={{marginTop: 20}}>
                        <Button onClick={onEditClick}
                                icon={<VscEdit size={20}/>}
                                label="Edit" disabled={typeof data === "undefined"}/>
                        <Button onClick={() => onGoToEditFlow(data.id)}
                                icon={<IoGitNetworkSharp size={20} style={{marginRight: 5}}/>}
                                label="Edit FLOW"
                                disabled={typeof data === "undefined"}/>
                        <Button onClick={() => onGoToDeployedFlow(data.id)}
                                icon={<IoGitNetworkSharp size={20} style={{marginRight: 5}}/>}
                                label="View Deployed FLOW"
                                disabled={typeof data === "undefined"}/>
                        {onDeleteComplete && <Button
                            icon={<VscTrash size={20}/>}
                            onClick={onDelete}
                            label="Delete"
                            disabled={typeof data === "undefined"}/>
                        }
                    </Rows>
                </TuiFormGroupField>
            </TuiFormGroupContent>
        </TuiFormGroup>

        <TuiFormGroup>
            <TuiFormGroupHeader header="Rules" description="List of rules connected with the workflow."/>
            <TuiFormGroupContent>
                <TuiFormGroupField header="Active rules" description="Rules that trigger this flow">
                    <FlowRules flowName={data.name} id={id}/>
                </TuiFormGroupField>
            </TuiFormGroupContent>
        </TuiFormGroup>

    </TuiForm>

    return <div className="Box10" style={{height: "100%"}}>
        {loading && <CenteredCircularProgress/>}
        {data && <Details/>}
        <FormDrawer
            width={800}
            label="Edit Flow"
            onClose={() => {
                setDisplayEdit(false)
            }}
            open={displayEdit}>
            {displayEdit && <FlowForm
                onFlowSaveComplete={onEditComplete}
                id={data.id}
                name={data.name}
                description={data.description}
                enabled={data.enabled}
                projects={data.projects}
            />}
        </FormDrawer>
    </div>
}

FlowDetails.propTypes = {
    id: PropTypes.string,
    onDeleteComplete: PropTypes.func,
};