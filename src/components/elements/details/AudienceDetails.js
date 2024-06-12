import {useFetch} from "../../../remote_api/remoteState";
import {computeAudience, computeAudienceById} from "../../../remote_api/endpoints/audience";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import FetchError from "../../errors/FetchError";
import React from "react";
import PropertyField from "./PropertyField";
import Counter, {BigCounter} from "../metrics/Counter";
import {ProfileDetailsById} from "./ProfileDetails";
import {isNotEmptyArray} from "../../../misc/typeChecking";
import JsonBrowser from "../misc/JsonBrowser";
import Tabs, {TabCase} from "../tabs/Tabs";
import {Paper} from "@mui/material";
import {getEventsCount} from "../../../remote_api/endpoints/event";
import {abbreviateNumber, toPercentage} from "../../../misc/converters";

function AudienceCounter({total}) {
    const {isLoading, data: eventCount, error} = useFetch(
        ['eventCount', []],
        getEventsCount(),
        data => {
            return data?.count
        },
        {retry: 0})

    if(isLoading) {
        return <Counter label="Audience Count"
                        width={200}
                        margin={0}
                        value={total ? total : "unknown"}
                        hint={"Loading..."}
        />
    }

    return <Counter label="Audience Count"
                    width={200}
                    margin={0}
                    value={total}
                    hint={<span>{toPercentage(total/eventCount)} from {abbreviateNumber(eventCount)}</span>}
    />
}


export function AudienceDetailsById({audienceId}) {
    const {isLoading, data, error} = useFetch(
        [`ComputeAudience-${audienceId}`, [audienceId]],
        computeAudienceById(audienceId),
        data => {
            return data
        },
        {retry: 0})

    if (isLoading) {
        return <CenteredCircularProgress/>
    }

    if (error) {
        return <FetchError error={error}/>
    }

    return <div>
        <BigCounter label="Audience Count"
                    value={data?.total}
                    hint={<span>3% from 4.7M</span>}
        />
        {data?.result.map((id, index) => {
            return <PropertyField key={index}
                                  labelWidth={30}
                                  drawerSize={1200}
                                  name="Profile Id"
                                  content={id}>
                <ProfileDetailsById id={id}/>
            </PropertyField>
        })}
    </div>
}

function AudienceEstimate({label, total}) {
    return <Counter label={label}
                    width={200}
                    margin={0}
                    value={total}
    />
}

function getCounter(data) {
    if(data?.estimate) {

        let _value;
        if(data?.min!==null && data?.max!==null) {
            _value = `${abbreviateNumber(data?.min)}-${abbreviateNumber(data?.max)}`
        } else if (data?.min===null && data?.max===null) {
            _value = "Max Profiles"
        } else if (data?.min!==null && data?.max===null) {
            _value = `${abbreviateNumber(data?.min)}-Max`
        } else if (data?.min===null && data?.max!==null) {
            _value = `0-${abbreviateNumber(data?.max)}`
        }

        return <AudienceEstimate label="Audience Estimate" total={_value}/>
    } else {
        return <AudienceCounter label="Audience Count" total={data?.total}/>
    }
}

export default function AudienceDetails({audience}) {
    const {isLoading, data, error} = useFetch(
        [`ComputeAudience-${audience?.name}`, [audience]],
        computeAudience(audience),
        data => {
            return data
        },
        {retry: 0, refetchOnWindowFocus: false})

    if (isLoading) {
        return <CenteredCircularProgress label="Please Wait. Audience number is estimated."/>
    }

    if (error) {
        return <FetchError error={error}/>
    }

    return <>
        <div style={{padding: 30}}>
            {getCounter(data)}
        </div>
        <Tabs tabs={["Audience Sample", "Queries"]}>
            <TabCase id={0}>
                {isNotEmptyArray(data?.result) && <div style={{margin: 20}}>
                    <div style={{padding: "0 0 10px 10px"}}>Sample Audience Profiles</div>
                    <div style={{backgroundColor: "rgba(128,128,128,.3", borderRadius: 10, padding: 10}}>
                        {data?.result.map((id, index) => {
                            return <PropertyField key={index}
                                                  drawerSize={1200}
                                                  content={id}>
                                <ProfileDetailsById id={id}/>
                            </PropertyField>
                        })}
                    </div>
                </div>}
            </TabCase>
            <TabCase id={1}>
                <Paper style={{margin: 20}}>
                <JsonBrowser data={data?.queries}/>
                </Paper>
            </TabCase>
        </Tabs>
    </>
}