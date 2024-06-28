import {VscRequestChanges} from "react-icons/vsc";
import React from "react";
import PopOverIconButton from "../forms/buttons/PopOverIconButton";
import DateValue from "./DateValue";

export function ChangeTimeIcon({field, metadata}) {
    return <PopOverIconButton style={{cursor: "pointer", display: "flex"}} icon={<VscRequestChanges size={20} />} singleIcon={true}>
        <div style={{padding: 20}}>
            <div><b>Field</b>:<br/> {field}</div>
            {metadata[0] && <div style={{marginTop: 15}}><b>Changed</b>: <br/><DateValue date={new Date(metadata[0]*1000).toISOString()}/></div>}
            {metadata[1] && <div style={{marginTop: 10}}><b >Detail</b>: <br/> {metadata[1]}</div>}
        </div>
    </PopOverIconButton>
}