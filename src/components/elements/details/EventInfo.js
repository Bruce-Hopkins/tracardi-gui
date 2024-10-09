import React, {useContext} from "react";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import {object2dot} from "../../../misc/dottedObject";
import PropertyField from "./PropertyField";
import {TuiForm, TuiFormGroup, TuiFormGroupContent} from "../tui/TuiForm";
import {isEmptyObjectOrNull} from "../../../misc/typeChecking";
import EventSourceDetails from "./EventSourceDetails";
import EventStatusTag from "../misc/EventStatusTag";
import EventValidation from "../misc/EventValidation";
import TuiTags from "../tui/TuiTags";
import DateValue from "../misc/DateValue";
import IdLabel from "../misc/IconLabels/IdLabel";
import EventDetails from "./EventDetails";
import EventWarnings from "../misc/EventWarnings";
import EventErrorTag from "../misc/EventErrorTag";
import NoData from "../misc/NoData";
import {useFetch} from "../../../remote_api/remoteState";
import {getEventById} from "../../../remote_api/endpoints/event";
import FetchError from "../../errors/FetchError";
import Tabs, {TabCase} from "../tabs/Tabs";
import {EventDataTable} from "./EventData";
import EventTypeTag from "../misc/EventTypeTag";
import EventJourneyTag from "../misc/EventJourneyTag";
import MergingAlert from "../misc/MergingAlert";
import hasRoles from "../../authentication/hasRoles";
import {KeyCloakContext} from "../../context/KeyCloakContext";
import CrossDomainEvent from "../misc/CrossDomainEvent";
import ProfileLabel from "../misc/IconLabels/ProfileLabel";


const EventDataDetails = ({event, metadata, allowedDetails = []}) => {

    const authContext = useContext(KeyCloakContext)

    const RequestData = () => {
        const context = object2dot(event?.request);
        return <div style={{margin: 20}}>{Object.keys(context).map(key => <PropertyField key={key} name={key}
                                                                                         content={context[key]}/>)}</div>
    }


    const ContextInfo = () => {
        const context = object2dot(event?.context);
        return <div style={{margin: 20}}>{Object.keys(context).map(key => <PropertyField key={key} name={key}
                                                                                         content={context[key]}/>)}</div>
    }

    const EventProperties = () => {
        const eventProperties = object2dot(event?.properties);
        return <div style={{margin: 20}}>{Object.keys(eventProperties).map(key => <PropertyField key={key} name={key}
                                                                                                 content={eventProperties[key]}/>)}</div>
    }
    const EventTraits = () => {
        const traits = object2dot(event?.traits);
        return <div style={{margin: 20}}>{Object.keys(traits).map(key => <PropertyField key={key} name={key}
                                                                                        content={traits[key]}/>)}</div>
    }

    return <TuiForm>
        <TuiFormGroup>
            <Tabs tabs={["Event details", "Advanced"]}>
                <TabCase id={0}>
                    <TuiFormGroupContent style={{display: "flex", flexDirection: "column", padding: 20}}>
                        <PropertyField name="Id" content={<IdLabel label={event?.id}/>}>
                            <EventDetails event={event}
                                          routing={hasRoles(authContext?.state?.roles, ['admin', 'developer'])}/>
                        </PropertyField>

                        <PropertyField name="Type"
                                       content={<EventTypeTag event={event}/>}/>
                        {event?.metadata?.time?.create && <PropertyField name="Create time"
                                                                         content={<DateValue
                                                                             date={event?.metadata?.time?.create}/>}
                        />}
                        <PropertyField name="Insert time"
                                       content={<DateValue date={event?.metadata?.time?.insert}/>}
                        />
                        <PropertyField name="Status"
                                       content={<>
                                           <CrossDomainEvent event={event}/>
                                           <EventStatusTag label={event?.metadata?.status}/>
                                           <MergingAlert eventMetaData={event?.metadata}/>
                                           <EventValidation eventMetaData={event?.metadata}/>
                                           <EventWarnings eventMetaData={event?.metadata}/>
                                           <EventErrorTag eventMetaData={event?.metadata}/>
                                       </>}/>
                        {event.journey.state && <PropertyField name="Journey state"
                                                               content={
                                                                   <EventJourneyTag>{event.journey.state}</EventJourneyTag>}/>}


                    </TuiFormGroupContent>
                </TabCase>
                <TabCase id={1}>
                    <TuiFormGroupContent style={{display: "flex", flexDirection: "column", padding: 20}}>
                        {event?.session && <PropertyField name="Session id" content={event.session?.id}/>}
                        {event?.profile && <PropertyField name="Profile id" content={<ProfileLabel label={event.profile?.id}/>}/>}
                        {event?.source && <PropertyField name="Event source" content={event.source.id} drawerSize={820}>
                            {allowedDetails.includes("source") && <EventSourceDetails id={event.source.id}/>}
                        </PropertyField>}
                        {metadata?.index && <PropertyField name="Index" content={metadata.index}/>}
                        {metadata?.ip && <PropertyField name="IP Address" content={metadata.ip}/>}
                        {Array.isArray(event?.metadata?.processed_by?.rules) && <PropertyField
                            name="Routed by rules"
                            content={<TuiTags tags={event.metadata?.processed_by?.rules} size="small"/>}/>}
                        <PropertyField name="Tags"
                                       content={Array.isArray(event?.tags?.values) &&
                                       <TuiTags tags={event.tags.values} size="small"/>}
                        />
                    </TuiFormGroupContent>
                </TabCase>
            </Tabs>
        </TuiFormGroup>
        <TuiFormGroup>
            <Tabs tabs={["Properties", "Traits", "Data", "Context", "Request"]}>
                <TabCase id={0}>
                    {!isEmptyObjectOrNull(event?.properties) ?
                        <TuiFormGroupContent><EventProperties/></TuiFormGroupContent> :
                        <NoData header="No properties">
                            This event does not have any properties.
                        </NoData>}
                </TabCase>
                <TabCase id={1}>
                    {!isEmptyObjectOrNull(event?.traits) ? <TuiFormGroupContent><EventTraits/></TuiFormGroupContent> :
                        <NoData header="No traits">
                            This event does not have any traits.
                        </NoData>}
                </TabCase>
                <TabCase id={2}>
                    <section style={{margin: 20}}>
                        {!isEmptyObjectOrNull(event?.data) ? <EventDataTable event={event}/> :
                            <NoData header="No indexed data">
                                This event does not have any indexed data.
                            </NoData>}
                    </section>
                </TabCase>
                <TabCase id={3}>
                    {!isEmptyObjectOrNull(event?.context) ? <TuiFormGroupContent><ContextInfo/></TuiFormGroupContent> :
                        <NoData header="No context">
                            This event does not have any context data.
                        </NoData>}
                </TabCase>
                <TabCase id={4}>
                    {!isEmptyObjectOrNull(event?.request) ? <TuiFormGroupContent><RequestData/></TuiFormGroupContent> :
                        <NoData header="No request data">
                            This event does not have any request data.
                        </NoData>}
                </TabCase>
            </Tabs>
        </TuiFormGroup>
    </TuiForm>
}

export default function EventInfo({id, allowedDetails}) {

    const {isLoading, data, error} = useFetch(
        ["event", [id]],
        getEventById(id),
        (data) => {
            return data
        }
    )

    if (error) {
        return <FetchError error={error}/>
    }

    if (isLoading) {
        return <CenteredCircularProgress/>
    }

    return <EventDataDetails event={data?.event}
                             metadata={data?._metadata}
                             allowedDetails={allowedDetails}/>
}