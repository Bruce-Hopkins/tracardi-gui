import React from "react";
import PropertyField from "./PropertyField";
import TuiTags from "../tui/TuiTags";
import ActiveTag from "../misc/ActiveTag";

export default function EventTypeMetadata({data}) {
    return <div>
        <PropertyField name="Description" content={data?.description}/>
        {data?.tags && <PropertyField name="Tags"
                                      content={<TuiTags tags={data.tags}
                                                        size="small"/>}/>}
        <PropertyField name="Enabled"
                       underline={false}
                       content={<ActiveTag active={data?.enabled}/>}/>

    </div>
}