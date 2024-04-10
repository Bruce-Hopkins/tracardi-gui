import LinearProgress from "@mui/material/LinearProgress";
import React, {useEffect, useState} from "react";
import {getError} from "../../../remote_api/entrypoint";
import {useRequest} from "../../../remote_api/requestClient";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#d81b60',
        color: 'white',
        fontSize: theme.typography.pxToRem(15),
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#d81b60',
    },
}));


export default function BackgroundTaskProgress({taskId, refreshInterval = 5}) {

    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const {request} = useRequest()

    const clearUpdateInterval = (status) => {
        return status === "finished" || status === "error"
    }

    useEffect(() => {
        let timer;

        request({url: `/import/task/${taskId}/status`})
            .then(response => {
                setStatus(response.data);
                setError(null);
                if (clearUpdateInterval(response?.data?.status)) {
                    clearInterval(timer);
                } else {
                    timer = setInterval(() => {
                        request({url: `/import/task/${taskId}/status`})
                            .then(response => {
                                setStatus(response.data);
                                setError(null);
                                if (clearUpdateInterval(response?.data?.status)) {
                                    clearInterval(timer);
                                }
                            })
                            .catch(e => {
                                if (timer) setError(getError(e))
                            })
                    }, refreshInterval * 1000);
                }
            })
            .catch(e => {
                setError(getError(e))
            })

        return () => {
            if (timer) clearInterval(timer);
        };

    }, [taskId, refreshInterval])

    if(error) {
        return <>Connection lost<LinearProgress color={"secondary"}/></>
    }

    const normalizeProgress = () => {
        let current = status?.progress ? status.progress : 0;
        return Math.floor(current);
    }

    if(status?.status === "error") {
        return <StyledTooltip title={status?.message}><span>{status?.status.toUpperCase()}</span></StyledTooltip>
    }

    if (status?.progress) {

        const progress = normalizeProgress();

        return <>
            {status?.status.toUpperCase()}
            <LinearProgress
            variant="determinate"
            value={progress}
        /></>
    }

    if(status?.status === "finished") {
        return <>
            {status?.status.toUpperCase()}
            <LinearProgress
                variant="determinate"
                value={100}
                color="primary"
            /></>
    }

    if(status?.status === "pending") {
        return <>
            {status?.status.toUpperCase()}
            <LinearProgress
                variant="determinate"
                value={0}
                color="primary"
            /></>
    }



    return status?.status.toUpperCase() || <>Connecting...<LinearProgress color={"primary"}/></>

}