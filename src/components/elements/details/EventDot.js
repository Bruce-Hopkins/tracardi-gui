import React from "react";
import {BsGear} from "react-icons/bs";
import {VscPulse} from "react-icons/vsc";
import "./EventDot.css";

export default function eventDot(event, theme) {

    if (Array.isArray(event?.tags?.values)) {
        if (event.tags.values.includes('event:system')) {
            return <BsGear size={16}
                           title="System Event"
                           style={{marginRight: 10}}/>
        } else if(event.tags.values.includes('event:signal')) {
            return <VscPulse size={16}
                           title="System Signal"
                           style={{marginRight: 10}}/>
        }
    }

    const color = theme.palette.primary.main

    if (event?.context?.cde?.profile) {
        return <div className="EventDot"
                    title="Cross Domain Event"
                    style={{
                        backgroundColor: "#EF6C00"
                    }}/>
    }

    return <div className="EventDot"
                title="Event"
                style={{
                    backgroundColor: {
                        collected: color,
                        error: "#d81b60",
                        processed: "#43a047"
                    }[event?.metadata?.status]
                }}/>
}
