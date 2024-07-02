import React from "react";
import PopOverIconButton from "../forms/buttons/PopOverIconButton";
import DateValue from "./DateValue";
import TimeDifference from "../datepickers/TimeDifference";

export function ChangeTimeIcon({field, metadata}) {

    try {
        const isoDate = new Date(metadata[0] * 1000).toISOString()

        return <PopOverIconButton style={{cursor: "pointer", display: "flex"}} icon={<TimeDifference date={isoDate}/>}
                                  singleIcon={true}>
            <div style={{padding: 20}}>
                <div><b>Field</b>:<br/> {field}</div>
                {metadata[0] && <div style={{marginTop: 15}}><b>Changed</b>: <br/><DateValue date={isoDate}/></div>}
                {metadata[1] && <div style={{marginTop: 10}}><b>Detail</b>: <br/> {metadata[1]}</div>}
            </div>
        </PopOverIconButton>

    } catch (e) {
        return ""
    }


}