import TimeDifference from "../datepickers/TimeDifference";
import React, {useState} from "react";
import {makeTzAwareDate} from "../../../misc/converters";
import {BsClock, BsGlobe} from "react-icons/bs";
import {formatUTCDate} from "../../../misc/date";

function getDate(local, dateString) {

    let iso_date;
    let date;

    const dateTz = makeTzAwareDate(dateString)

    if(dateTz !== null) {

        iso_date = dateTz.toISOString()

        if(local) {
            date = dateTz.toLocaleString()
        } else {
            date = formatUTCDate(dateTz)
        }
    } else {
        date = null
        iso_date = null
    }

    return {date, isoDate: iso_date}
}

export default function DateValue({date: dateString, fallback, style}) {

    const [local, setLocal] = useState(true)

    const handleTimeChange = () => {
        setLocal(!local)
    }
    let date = getDate(local, dateString)

    if(!date.date && fallback) {
        date = getDate(local, fallback)
    }

    return <span className="flexLine" style={{...style, cursor: "pointer"}} onClick={handleTimeChange}>
        {local ? <BsClock size={20}/> : <BsGlobe size={20}/>}
        <span style={{margin: 5, marginRight: 10}}>{date.date || '<n/a>'}</span> <TimeDifference date={date.isoDate}/>
        </span>
}

export function DateTimeDifference({date: dateString}) {
    const date = getDate(true, dateString)
    return <TimeDifference date={date.isoDate}/>
}