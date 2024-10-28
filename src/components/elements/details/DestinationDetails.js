import React, {useEffect, useRef} from "react";
import "./Details.css";
import "./RuleDetails.css";
import PropTypes from "prop-types";
import {TuiForm, TuiFormGroup, TuiFormGroupContent, TuiFormGroupField, TuiFormGroupHeader} from "../tui/TuiForm";
import {useConfirm} from "material-ui-confirm";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import FormDrawer from "../drawers/FormDrawer";
import Properties from "./DetailProperties";
import DestinationForm from "../forms/DestinationForm";
import {useRequest} from "../../../remote_api/requestClient";
import NoData from "../misc/NoData";
import Tag from "../misc/Tag";
import PropertyField from "./PropertyField";
import IconLabel from "../misc/IconLabels/IconLabel";
import FlowNodeIcons from "../../flow/FlowNodeIcons";
import TuiTags from "../tui/TuiTags";
import ActiveTag from "../misc/ActiveTag";
import {DisplayOnlyIf} from "../../context/RestrictContext";
import {isNotEmptyArray} from "../../../misc/typeChecking";
import {DetailsHeader} from "./DetailsHeader";

function DestinationDetails({id, onDelete, onEdit, onDeleteComplete}) {

    const [loading, setLoading] = React.useState(false);
    const [deleteProgress, setDeleteProgress] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);

    const mounted = useRef(false);
    const confirm = useConfirm()
    const {request} = useRequest()

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        request({
                url: '/destination/' + id,
                method: "get"
            }
        ).then((response) => {
            if (response?.data && mounted.current) {
                setData(response?.data)
            }
        }).catch((e) => {
            if (e && mounted.current) {

            }
        }).finally(
            () => {
                if (mounted.current) {
                    setLoading(false)
                }
            }
        )
    }, [id])

    const handleEdit = () => {
        setOpenEdit(true)
    }

    const handleDelete = () => {
        confirm({title: "Do you want to delete this destination?", description: "This action can not be undone."})
            .then(async () => {
                    setDeleteProgress(true);
                    await request({
                        url: '/destination/' + id,
                        method: "delete"
                    })
                    if (onDelete && mounted.current === true) {
                        onDelete(data.id)
                    }
                }
            )
            .catch(
                () => {
                }
            ).finally(() => {
                if (mounted.current === true) {
                    setDeleteProgress(false);
                }
            }
        )
    }

    if(loading) {
        return <CenteredCircularProgress/>
    }

    return <TuiForm style={{margin: 20}}>
            <DetailsHeader
                data={data}
                name={data?.name}
                type={data?.type}
                description={data?.description}
                icon="destination"
                timestamp={data?.timestamp}
                tags={data?.tags}
                locked={data?.locked}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDeleteComplete={onDeleteComplete}
            />
            <TuiFormGroup>
                <TuiFormGroupContent>

                    <PropertyField name="Name" content={data?.name}/>
                    <PropertyField name="Description" content={data?.description}/>
                    <DisplayOnlyIf condition={isNotEmptyArray(data?.tags)}>
                        <PropertyField name="Tags"
                                       content={<TuiTags tags={data?.tags}
                                                         size="small"/>}/>
                    </DisplayOnlyIf>
                    <PropertyField name="Enabled"
                                   content={<ActiveTag active={data?.enabled}/>}/>
                    <PropertyField name="Locked (Read Only)"
                                   content={<ActiveTag active={data?.locked === true}/>}/>
                    <PropertyField name="Trigger"
                                   content={<Tag>{data?.on_profile_change_only ? "Trigger on profile change" : "Trigger every event"}</Tag>}/>
                    <DisplayOnlyIf condition={data?.on_profile_change_only === false}>
                        {data?.event_type?.name
                            ? <PropertyField
                                name="Event type"
                                content={<IconLabel value={data?.event_type.name || "All"}
                                                    icon={<FlowNodeIcons icon="event"/>}
                                />}
                            />
                            : <PropertyField
                                name="Event type"
                                content={<IconLabel value={data?.event_type || "All"}
                                                    icon={<FlowNodeIcons icon="event"/>}
                                />}
                            />}
                    </DisplayOnlyIf>

                </TuiFormGroupContent>
            </TuiFormGroup>
            <TuiFormGroup>
                <TuiFormGroupHeader header="Destination Class"/>
                <TuiFormGroupContent>
                    <Tag>{data?.destination?.package}</Tag>
                </TuiFormGroupContent>
            </TuiFormGroup>

            <TuiFormGroup>
                <TuiFormGroupHeader header="Conditional triggering"
                                    description="This destination will be triggered only if this condition is met."/>

                <TuiFormGroupContent>
                    {data?.condition ? data?.condition : <NoData header="No conditional triggering">This destination will be triggered without additional conditions.</NoData>}
                </TuiFormGroupContent>
            </TuiFormGroup>
            <TuiFormGroup>
                <TuiFormGroupHeader header={data?.name}/>
                <TuiFormGroupContent>
                    <TuiFormGroupContent>
                        <TuiFormGroupField description={data?.description}>
                            <Properties properties={data}/>
                        </TuiFormGroupField>
                    </TuiFormGroupContent>
                </TuiFormGroupContent>
            </TuiFormGroup>

            <FormDrawer
                width={750}
                onClose={() => {
                    setOpenEdit(false)
                }}
                open={openEdit}>
                {openEdit && <DestinationForm
                    onSubmit={onEdit}
                    value={data}
                />}
            </FormDrawer>
        </TuiForm>
}

DestinationDetails.propTypes = {
    id: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
};

export default DestinationDetails;
