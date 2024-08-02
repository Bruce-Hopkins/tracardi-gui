import React, {Suspense, useEffect} from "react";
import "../lists/cards/SourceCard.css";
import "./ResourceDetails.css";
import "./Details.css";
import Properties from "./DetailProperties";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import {useConfirm} from "material-ui-confirm";
import FormDrawer from "../drawers/FormDrawer";
import ResourceForm from "../forms/ResourceForm";
import PropTypes from "prop-types";
import {TuiForm, TuiFormGroup, TuiFormGroupContent, TuiFormGroupHeader} from "../tui/TuiForm";
import CredentialsVault from "../misc/CredentialsVault";
import {useRequest} from "../../../remote_api/requestClient";
import {DetailsHeader} from "./DetailsHeader";

const TrackerUseScript = React.lazy(() => import('../tracker/TrackerUseScript'));
const TrackerScript = React.lazy(() => import('../tracker/TrackerScript'));

export default function ResourceDetails({id, onDeleteComplete}) {

    const confirm = useConfirm();
    const [data, setData] = React.useState(null);
    const [credentials, setCredentials] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [editData, setEditData] = React.useState(null);

    const {request} = useRequest()

    useEffect(() => {
        setLoading(true);
        let isSubscribed = true;
        request(
            {
                url: '/resource/' + id,
                method: "GET"
            }).then(response => {
            if (response && isSubscribed === true) {
                setCredentials(response.data.credentials);
                delete response.data.credentials;
                setData(response.data);
            }
        }).catch(e => {
            if (e && isSubscribed === true) {
                console.error(e)
            }
        }).finally(() => {
            if (isSubscribed === true) setLoading(false)
        })

        return () => {
            isSubscribed = false
        }

    }, [id])

    const onEdit = () => {
        const editData = JSON.parse(JSON.stringify(data));
        editData.credentials = JSON.parse(JSON.stringify(credentials));
        setEditData(editData)
    }

    const onDelete = () => {
        confirm({
            title: "Do you want to delete this resource?",
            description: "This action can not be undone."
        }).then(async () => {
            try {
                const response = await request(
                    {
                        url: '/resource/' + data.id,
                        method: "DELETE"
                    })
                if (onDeleteComplete) {
                    onDeleteComplete(response)
                }
            } catch (e) {
                console.error(e)
            }
        }).catch(() => {
        })
    }
    const Details = () => <>
        <DetailsHeader
            data={{...data, credentials}}
            name={data?.name}
            type={data?.type}
            description={data?.description}
            icon={data?.icon}
            timestamp={data?.timestamp}
            tags={data?.tags}
            locked={data?.locked}
            onDelete={onDelete}
            onEdit={onEdit}
        />
        <TuiForm>
            <TuiFormGroup>
                <TuiFormGroupHeader header="Credentials"/>
                <TuiFormGroupContent header={"Data"}>
                    <CredentialsVault production={credentials?.production} test={credentials?.test}/>
                </TuiFormGroupContent>
            </TuiFormGroup>
            <TuiFormGroup>
                <TuiFormGroupHeader header="Destination"/>
                <TuiFormGroupContent header={"Data"}>
                    {(data?.destination && <Properties
                        properties={(data?.destination)}/>) || "This resource does not provide destination configuration."}
                </TuiFormGroupContent>
            </TuiFormGroup>
            <TuiFormGroup>
                <TuiFormGroupHeader header="Other details"/>
                <TuiFormGroupContent header={"Data"}>
                    <Properties properties={data} exclude={['tags', 'destination', 'name', 'description',]}/>
                </TuiFormGroupContent>
            </TuiFormGroup>
        </TuiForm>

        {data.type === "web-page" && <TuiForm>
            <TuiFormGroup>
                <TuiFormGroupHeader header="Integration"
                                    description="Please paste this code into your web page. This code should appear on every page."/>
                <TuiFormGroupContent>
                    <Suspense fallback={<CenteredCircularProgress/>}><TrackerScript sourceId={data.id}/></Suspense>
                </TuiFormGroupContent>
            </TuiFormGroup>

            <TuiFormGroup>
                <TuiFormGroupHeader header="Javascript example"
                                    description="This is an example of event sending. This code sends multiple events. Please refer to Tracardi documentation on more complex configuration."/>
                <TuiFormGroupContent>
                    <Suspense fallback={<CenteredCircularProgress/>}><TrackerUseScript/></Suspense>
                </TuiFormGroupContent>
            </TuiFormGroup>
        </TuiForm>
        }

    </>

    return <div className="Box10" style={{height: "100%"}}>
        {loading && <CenteredCircularProgress/>}
        {data && <Details/>}

        <FormDrawer
            width={700}
            onClose={() => {
                setEditData(null)
            }}
            open={editData !== null}>
            <ResourceForm init={editData} onClose={() => {
                setEditData(null)
            }}/>
        </FormDrawer>
    </div>

}

ResourceDetails.propTypes = {
    id: PropTypes.string,
    onDeleteComplete: PropTypes.func,
};