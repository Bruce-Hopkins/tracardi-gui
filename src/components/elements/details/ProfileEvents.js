import React, {useState} from "react";
import {Step, StepLabel, Stepper} from "@mui/material";
import "./ProfileEvents.css";
import DateValue from "../misc/DateValue";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import {useFetch} from "../../../remote_api/remoteState";
import {getProfileEvents} from "../../../remote_api/endpoints/profile";
import EventDetailsDialog from "../dialog/EventDetailsDialog";
import {capitalizeString} from "../misc/EventTypeTag";
import NoData from "../misc/NoData";
import eventDot from "./EventDot";
import useTheme from "@mui/material/styles/useTheme";

function EventStream({events}) {

    const theme = useTheme()

    const [currentEvent, setCurrentEvent] = useState(null)
    const [open, setOpen] = useState(false)

    const handleDetails = (event) => {
        setCurrentEvent(event)
        setOpen(true)
    }

    return <>
        <EventDetailsDialog event={currentEvent}
                            open={open}
                            onClose={() => setOpen(false)}
        />
        <div className="EventStream">
            <Stepper
                orientation="vertical"
                connector={<div className="EventConnector"/>}
            >
                {
                    Array.isArray(events) && events.length > 0
                        ? events.map(event => (
                            <Step
                                completed={true}
                                key={event.id}
                            >
                                <div style={{
                                    alignSelf: "center",
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    width: 318
                                }}>
                                    <DateValue date={event?.metadata?.time?.create}
                                               fallback={event?.metadata?.time?.insert}/>
                                </div>
                                <StepLabel
                                    StepIconComponent={() => eventDot(event, theme)}
                                    onClick={() => handleDetails(event)}
                                >
                                    {event?.name || capitalizeString(event?.type)}
                                </StepLabel>
                            </Step>

                        ))
                        : <NoData header="No events">
                            <div align="center">Events are stored in batches, which means they will be visible after
                                sometime the profile has been saved.
                            </div>
                        </NoData>
                }

            </Stepper>
        </div>
    </>
}

export default function ProfileEvents({profileId}) {

    const {isLoading, data} = useFetch(
        ["profileEvents", profileId],
        getProfileEvents(profileId),
        (data) => data
    )

    if (isLoading) {
        return <CenteredCircularProgress/>
    }

    return <EventStream events={data.result}/>
}