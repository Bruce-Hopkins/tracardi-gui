import React, {useCallback} from "react";
import "../elements/lists/CardBrowser.css";
import CardBrowser from "../elements/lists/CardBrowser";
import EventToProfileForm from "../elements/forms/EventToProfileForm";
import EventToProfileDetails from "../elements/details/EventToProfileDetails";
import Tag from "../elements/misc/Tag";
import FlowNodeIcons from "../flow/FlowNodeIcons";

export default function EventToProfile() {

    const urlFunc = useCallback((query) => ('/events-to-profiles/by_tag' + ((query) ? "?query=" + query : "")), []);
    const addFunc = useCallback((close) => <EventToProfileForm onSubmit={close}/>, []);
    const detailsFunc = useCallback((id, close) => <EventToProfileDetails id={id} onDeleteComplete={close}
                                                                         onEditComplete={close}/>, [])
    const descFunc = useCallback((row) => (<>
        {row.event_type?.name && <Tag>{row.event_type.name} ({row.event_type.id})</Tag>}
        {row.config?.condition && <Tag backgroundColor="#3B82F6" color="white" tip={row.config?.condition}>Conditional</Tag>}
        {row.description && <span style={{marginRight: 5}}>{row.description}</span>}</>), [])

    return <CardBrowser
        label="Map event properties to profile"
        description="List of schemas that define how you transfer information from events to your profile."
        urlFunc={urlFunc}
        buttonLabel="New mapping"
        buttonIcon={<FlowNodeIcons icon="map-properties"/>}
        drawerDetailsWidth={900}
        detailsFunc={detailsFunc}
        drawerAddTitle="New mapping"
        drawerAddWidth={1000}
        addFunc={addFunc}
        deploymentTable="event_to_profile_mapping"
        deleteEndpoint='/event-to-profile/'
        icon="map-properties"
        descriptionFunc={descFunc}
    />
}
