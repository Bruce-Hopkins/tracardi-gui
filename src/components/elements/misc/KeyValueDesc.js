import './KeyValueDesc.css';
import React from "react";
import {IoCheckmarkCircleOutline, IoCloseCircleOutline, IoBanOutline} from "react-icons/io5";
import Button from "../forms/Button";

export default function KeyValueDesc({label, value, description, cluster}) {

    const v = (value) => {
        if(typeof value === "boolean") {
            return value ? <IoCheckmarkCircleOutline size={30} style={{color: "green"}}/> : <IoCloseCircleOutline size={30} style={{color: "crimson"}}/>
        } else if (value === null) {
            return <IoBanOutline size={30} style={{color: "#999"}}/>
        } else {
            return value;
        }
    }

    return <div className="KeyValueDesc">
        <div className="KeyDesc">
            <h1>{label}</h1>
            <aside>{description}</aside>
        </div>
        <div className="Value">
            {cluster ? <Button label="Configurable" icon={v(value)} style={{width: 300, marginRight: 5}}/> : v(value)}
        </div>
    </div>
}