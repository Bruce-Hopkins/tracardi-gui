import Tag from "./Tag";
import React from "react";

export function OriginTag({event}) {
    if (event?.request?.headers?.referer) {
        return <Tag tip="Site">{event.request.headers.referer}</Tag>
    }
    return ""
}