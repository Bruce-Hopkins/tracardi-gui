import FlowNodeIcons from "../../flow/FlowNodeIcons";
import Rows from "../misc/Rows";
import ProductionButton from "../forms/ProductionButton";
import {VscEdit, VscTrash} from "react-icons/vsc";
import TimeDifference from "../datepickers/TimeDifference";
import TuiTags from "../tui/TuiTags";
import React from "react";
import {JsonModalButton} from "../forms/buttons/JsonModalDetailsButton";
import Button from "../forms/Button";

export function DetailsHeader({data, name, type, description, icon, timestamp, tags, locked, onDelete, onEdit}) {
    return <div style={{display: "flex", margin: "5px 20px 20px 20px", flexDirection: "column"}}>

        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: 10}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
                <FlowNodeIcons icon={icon} size={30}/>
                <h1 className="header" style={{marginBottom: 0, marginLeft: 10}}> {name} {type && `(${type})`}</h1>
            </div>
            <div style={{display: "flex", alignItems: "start"}}>
                <Rows>
                    <JsonModalButton data={data} size="medium"/>
                    {locked !== true
                        ? <>
                        <ProductionButton
                            onClick={onEdit}
                            icon={<VscEdit size={20}/>}
                            label="Edit"
                            disabled={typeof data === "undefined"}
                        />
                        <ProductionButton
                            onClick={onDelete}
                            icon={<VscTrash size={20}/>}
                            label="Delete"
                            disabled={typeof data === "undefined"}
                        />
                    </>
                    : <Button label="LOCKED" selected={true} error={true} style={{marginLeft:3}}/>}
                </Rows>
            </div>
        </div>
        {description && <h2 className="subHeader">{description}</h2>}
        {timestamp && <div>
            Created: {timestamp} <TimeDifference date={timestamp}/>
        </div>}
        {tags && <div style={{marginBottom: 10}}>
            <TuiTags tags={tags} style={{marginLeft: 5, marginTop: 10}}/>
        </div>}
    </div>
}