import React from "react";
import {BsGear} from "react-icons/bs";
import "./EventDot.css";

export default function eventDot(event) {

    if (event?.source?.id.startsWith("@internal")) {
        return <BsGear size={12}
                       title="System Event"
                       style={{marginRight: 10}}/>
    }

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
                        collected: "#006db3",
                        error: "#d81b60",
                        processed: "#43a047"
                    }[event?.metadata?.status]
                }}/>
}
