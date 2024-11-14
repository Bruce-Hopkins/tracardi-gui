import React from "react";
import {Stepper, Step, StepLabel} from "@mui/material";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import Button from "../forms/Button";
import {FiMoreHorizontal} from "react-icons/fi";
import DateValue from "../misc/DateValue";
import {useFetch} from "../../../remote_api/remoteState";
import {getSessionEvents} from "../../../remote_api/endpoints/session";
import FetchError from "../../errors/FetchError";
import {capitalizeString} from "../misc/EventTypeTag";
import "./SessionStepper.css";
import eventDot from "../details/EventDot";
import useTheme from "@mui/material/styles/useTheme";

export default function SessionStepper({session, profileId, onEventSelect}) {

    const [eventsData, setEventsData] = React.useState([]);
    const [limit, setLimit] = React.useState(20);
    const [hasMore, setHasMore] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState(null);

    const theme = useTheme()

    const handleEventSelect = React.useCallback((eventId) => {
        setSelectedEvent(eventId)
        if (onEventSelect instanceof Function) {
            onEventSelect(eventId)
        }
    }, [onEventSelect])

    const {isLoading, error} = useFetch(
        ["sessionEvents", [limit, session.id, profileId]],
        getSessionEvents(session.id, profileId, limit),
        (data) => {
            setEventsData(data.result);
            setHasMore(data.more_to_load);
        }
    )

    React.useEffect(() => {
        if (limit === 20) {
            if (Array.isArray(eventsData) && eventsData.length > 0) {
                if (selectedEvent === null) {
                    handleEventSelect(eventsData[0]["id"])
                }
            }
        }
    }, [limit, eventsData, handleEventSelect, selectedEvent])

    const eventLabel= (selectedEvent, event) => {

        const eventType =  event?.name || capitalizeString(event?.type)

        if(selectedEvent === event.id) {
            if (event?.metadata?.valid === false) {
                return <b>{eventType + " (invalid)"}</b>
            }
            return <b>{eventType}</b>
        } else {
            if (event?.metadata?.valid === false) {
                return eventType + " (invalid)"
            }
            return eventType
        }
    }

    if (isLoading && Array.isArray(eventsData) && eventsData.length === 0) {
        return <CenteredCircularProgress/>
    }

    if (error) {
        return <FetchError error={error} style={{alignSelf: "flex-start"}}/>
    }

    return <div className="SessionStepper">

        {session && <div className="Header">
            Session starting {session?.metadata?.time?.create && <DateValue date={session?.metadata?.time?.create} />}
            </div>}
        {Array.isArray(eventsData) && eventsData.length > 0 && <Stepper
            orientation="vertical"
            connector={<div className="StepConnector" style={{marginLeft: 324}}/>}
        >
            {
                eventsData.map(event => (
                    <Step
                        completed={true}
                        key={event.id}
                        onClick={() => handleEventSelect(event.id)}
                    >
                        <div style={{
                            alignSelf: "center",
                            paddingLeft: 8,
                            paddingRight: 8,
                            width: 318
                        }}><DateValue date={event?.metadata?.time?.create} fallback={event?.metadata?.time?.insert}/></div>
                        <StepLabel
                            StepIconComponent={() => eventDot(event, theme)}
                        >
                            {eventLabel(selectedEvent, event)}
                        </StepLabel>
                    </Step>
                ))
            }
        </Stepper>
        }
        {hasMore && <Button
            label={"LOAD MORE"}
            icon={<FiMoreHorizontal/>}
            onClick={() => setLimit(limit + 20)}
            progress={isLoading}
            style={{width: "100%", display: "flex", justifyContent: 'center'}}
        />}
    </div>
}