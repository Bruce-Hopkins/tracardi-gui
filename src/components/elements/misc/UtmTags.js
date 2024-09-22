import Tag from "./Tag";
import React from "react";

export function UtmTags({utm}) {
    return <>
        {utm?.source && <Tag tip="Source">{utm.source}</Tag>}
        {utm?.medium && <Tag tip="Medium">{utm.medium}</Tag>}
        {utm?.campaign && <Tag tip="Campaign">{utm.campaign}</Tag>}
    </>
}