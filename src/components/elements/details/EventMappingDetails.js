import React, {useEffect} from "react";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import {useConfirm} from "material-ui-confirm";
import FormDrawer from "../drawers/FormDrawer";
import PropTypes from "prop-types";
import {TuiForm, TuiFormGroup, TuiFormGroupContent, TuiFormGroupHeader} from "../tui/TuiForm";
import EventMappingForm from "../forms/EventMappingForm";
import PropertyField from "./PropertyField";
import {isEmptyObjectOrNull} from "../../../misc/typeChecking";
import NoData from "../misc/NoData";
import {objectMap} from "../../../misc/mappers";
import AssignValueToKey from "./AssignValueToKey";
import {useRequest} from "../../../remote_api/requestClient";
import Tag from "../misc/Tag";
import {DetailsHeader} from "./DetailsHeader";

export function EventMappingCard({data, onDeleteComplete, onEditComplete, displayMetadata = true}) {

    const [displayEdit, setDisplayEdit] = React.useState(false);
    const [deleteProgress, setDeleteProgress] = React.useState(false);

    const confirm = useConfirm();
    const {request} = useRequest()

    const handleEdit = () => {
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
            title: "Do you want to delete this event type metadata?",
            description: "This action can not be undone."
        })
            .then(async () => {
                    setDeleteProgress(true);
                    try {
                        await request({
                            url: '/event-type/mapping/' + data?.id,
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

    const Details = () => <TuiForm>
        <TuiFormGroup>
            <TuiFormGroupHeader header="Trigger condition"/>
            <TuiFormGroupContent>
                <div style={{fontSize: 18}}><Tag backgroundColor="black" color="white">WHEN</Tag>event type is <Tag>{data?.event_type}</Tag></div>
            </TuiFormGroupContent>
        </TuiFormGroup>
        <TuiFormGroup>

            <TuiFormGroupHeader header="Event Properties Mapping"
                                description="The schema outlines how properties are transferred to data or traits.
                                Properties are not mandatory, and if a property is not set, it will not be
                                transferred, and no error will occur."
            />
            <TuiFormGroupContent>
                <div style={{fontSize: 18}}>
                    {!isEmptyObjectOrNull(data?.index_schema) ?
                        objectMap(data?.index_schema, (key, value) => {
                            return <AssignValueToKey key={key} value={`event@properties.${key}`}
                                                     label={`event@traits.${value}`} op="moves to"/>
                        }) : <NoData header="No data mapping">
                            <span style={{textAlign: "center"}}>Data is stored in event properties, it can be searched but it will not be visible as event traits, and no reporting will be possible.</span>
                        </NoData>
                    }
                </div>

            </TuiFormGroupContent>
        </TuiFormGroup>
        <TuiFormGroup>
            <TuiFormGroupHeader header="Event Journey Mapping"/>
            <TuiFormGroupContent>
                {data.journey ? <PropertyField name="Journey stage" content={data.journey} underline={false}/>
                    : <NoData header="No journey mapping">
                        <span
                            style={{textAlign: "center"}}>This event type is not mapped to any customer journey state.</span>
                    </NoData>}
            </TuiFormGroupContent>
        </TuiFormGroup>
        <TuiFormGroup>

            <TuiFormGroupHeader header="Event Description Template"
                                description="Description template is used to describe what does particular event type and to create a summary of its data."/>
            <TuiFormGroupContent>
                {data.description ? data.description
                    : <NoData header="No description template">
                        <span style={{textAlign: "center"}}>This event type does not have description template.</span>
                    </NoData>}
            </TuiFormGroupContent>
        </TuiFormGroup>
    </TuiForm>

    return <div className="Box10" style={{height: "100%"}}>
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
            onEdit={handleEdit}
            onDeleteComplete={onDeleteComplete}
        />
        {data && <Details/>}
        <FormDrawer
            width={800}
            onClose={() => {
                setDisplayEdit(false)
            }}
            open={displayEdit}>
            {displayEdit && <EventMappingForm
                onSubmit={handleEditComplete}
                {...data}
            />}
        </FormDrawer>
    </div>
}

export default function EventMappingDetails({id, onDeleteComplete, onEditComplete}) {

    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const {request} = useRequest()

    useEffect(() => {
            let isSubscribed = true;
            setLoading(true);
            request({
                url: '/event-type/mapping/' + id,
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

    const handleEditComplete = (data) => {
        setData(data)
        if (onEditComplete instanceof Function) {
            onEditComplete(data)
        }
    }

    if (loading) return <CenteredCircularProgress/>

    return <EventMappingCard data={data} onDeleteComplete={onDeleteComplete} onEditComplete={handleEditComplete}/>
}

EventMappingDetails.propTypes = {
    id: PropTypes.string,
    onDeleteComplete: PropTypes.func,
    onEditComplete: PropTypes.func
};