import React from "react";

export default function CrossDomainEvent({event}) {
    if (event?.context?.cde?.profile) {
        return <span className="HighlightTag" style={{
            backgroundColor: "#EF6C00",
            color: "white",
            marginRight: 5,
        }} title="Cross Domain Event.">
        CDE
        </span>
    }
    return ""
}