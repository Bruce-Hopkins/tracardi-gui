import React, {useEffect} from "react";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import {useConfirm} from "material-ui-confirm";
import FormDrawer from "../drawers/FormDrawer";
import PropTypes from "prop-types";
import {TuiForm, TuiFormGroup, TuiFormGroupContent, TuiFormGroupHeader} from "../tui/TuiForm";
import {isEmptyObjectOrNull} from "../../../misc/typeChecking";
import NoData from "../misc/NoData";
import EventToProfileForm from "../forms/EventToProfileForm";
import MappingsObjectDetails from "./MappingsObjectDetails";
import Tag from "../misc/Tag";
import {useRequest} from "../../../remote_api/requestClient";
import {DetailsHeader} from "./DetailsHeader";

export function EventToProfileCard({data, onDeleteComplete, onEditComplete, displayMetadata = true}) {

    const [displayEdit, setDisplayEdit] = React.useState(false);
    const [deleteProgress, setDeleteProgress] = React.useState(false);

    const confirm = useConfirm();
    const {request} = useRequest()

    const handleEditClick = () => {
        if (data) {
            setDisplayEdit(true);
        }
    }

    const handleEditComplete = (flowData) => {
        setDisplayEdit(false);
        if (onEditComplete instanceof Function) onEditComplete(flowData);
    }

    const handleDelete = () => {
        confirm({
            title: "Do you want to delete this coping schema?",
            description: "This action can not be undone."
        })
            .then(async () => {
                    setDeleteProgress(true);
                    try {
                        await request({
                            url: '/event-to-profile/' + data?.id,
                            method: "delete"
                        })
                        if (onDeleteComplete) {
                            onDeleteComplete(data?.id)
                        }
                    } catch (e) {

                    }
                }
            )
            .catch(() => {
            })
            .finally(() => {
                setDeleteProgress(false);
            })
    }

    const Details = () => <>
        <DetailsHeader
            data={data}
            name={data?.name}
            type={data?.type}
            description={data?.description}
            icon="map-properties"
            timestamp={data?.timestamp}
            tags={data?.tags}
            locked={data?.locked}
            onDelete={handleDelete}
            onEdit={handleEditClick}
            onDeleteComplete={onDeleteComplete}
        />
        <TuiForm>
            <TuiFormGroup>
                <TuiFormGroupHeader header="Trigger condition"/>
                <TuiFormGroupContent>
                    <div style={{fontSize: 18, marginBottom: 5}}><Tag backgroundColor="black" color="white">when</Tag>event
                        type <Tag>equals</Tag>{data?.event_type?.id}</div>
                    {data?.config?.condition && <div style={{fontSize: 18}}>
                        <fieldset style={{borderWidth: "1px 0 0 0", borderRadius: 0, marginTop: 8}}>
                            <legend style={{padding: "0 10px"}}>AND</legend>
                            <Tag backgroundColor="black" color="white">if</Tag>{data.config.condition}
                        </fieldset>
                    </div>}
                </TuiFormGroupContent>
            </TuiFormGroup>
            <TuiFormGroup>
                <TuiFormGroupHeader header="Event to profile mapping"
                                    description="This schema outlines which data from an event are copied to which profile data. e.g.
                    (profile) data.contact.email.private equals (event) properties.email."/>

                <TuiFormGroupContent>
                    {!isEmptyObjectOrNull(data?.event_to_profile)
                        ? <MappingsObjectDetails
                            properties={data.event_to_profile}
                            keyPrefix="event@"
                            valuePrefix="profile@"
                        />
                        : <NoData header="No schema defined"/>
                    }
                </TuiFormGroupContent>
            </TuiFormGroup>

        </TuiForm>
    </>

    return <div className="Box10" style={{height: "100%"}}>
        {data && <Details/>}
        <FormDrawer
            width={1000}
            onClose={() => {
                setDisplayEdit(false)
            }}
            open={displayEdit}>
            {displayEdit && <EventToProfileForm
                onSubmit={handleEditComplete}
                {...data}
            />}
        </FormDrawer>
    </div>
}


export default function EventToProfileDetails({id, onDeleteComplete, onEditComplete}) {

    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const {request} = useRequest()

    useEffect(() => {
            let isSubscribed = true;
            setLoading(true);
            request({
                url: '/event-to-profile/' + id,
                method: "get"
            })
                .then((result) => {
                    if (isSubscribed) setData(result.data);
                })
                .catch((e) => {
                    console.log(e)
                })
                .finally(
                    () => {
                        if (isSubscribed) setLoading(false)
                    }
                )
            return () => isSubscribed = false;
        },
        [id])

    if (loading)
        return <CenteredCircularProgress/>

    return <EventToProfileCard data={data} onDeleteComplete={onDeleteComplete} onEditComplete={onEditComplete}/>
}

EventToProfileDetails.propTypes = {
    id: PropTypes.string,
    onDeleteComplete: PropTypes.func,
    onEditComplete: PropTypes.func
};