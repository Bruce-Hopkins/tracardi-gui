import React, {useEffect, useState} from "react";
import {asyncRemote, getError} from "../../remote_api/entrypoint";
import TracardiProAvailableServicesList from "../elements/lists/TracardiProAvailableServicesList";
import TracardiProForm from "../elements/forms/TracardiProForm";
import FormDrawer from "../elements/drawers/FormDrawer";
import TracardiProServiceConfigForm from "../elements/forms/TracardiProServiceConfigForm";
import TracardiProRunningServicesList from "../elements/lists/TracardiProRunningServicesList";
import './TracardiPro.css';
import {TuiForm, TuiFormGroup, TuiFormGroupContent, TuiFormGroupHeader} from "../elements/tui/TuiForm";
import CenteredCircularProgress from "../elements/progress/CenteredCircularProgress";
import ErrorsBox from "../errors/ErrorsBox";

export default function TracardiPro() {

    const [endpoint, setEndpoint] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [refresh, setRefresh] = useState(1);
    const [display, setDisplay] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        asyncRemote({
            url: "/tpro"
        }).then(
            (response) => {

                if (response.status === 200) {
                    const _endpoint = response.data
                    if (_endpoint === null) {
                        setDisplay(1);
                    } else {
                        setDisplay(2);
                    }
                    setEndpoint(_endpoint)
                }
            }
        ).catch((e) => {
            setError(getError(e))
        }).finally(() => {
            setLoading(false);
        })

    }, [])


    const handleServiceAddClick = (service) => {
        setSelectedService(service)
    }

    const handleServiceSaveClick = async () => {
        setSelectedService(null);
    }

    const handleRegistrationSubmit = (endpoint) => {
        setEndpoint(endpoint)
        setDisplay(2)
    }

    return <div className="TracardiPro">
        {error && <ErrorsBox errorList={error} />}
        {loading && <CenteredCircularProgress/>}
        {display === 1 && <TracardiProForm value={endpoint} onSubmit={handleRegistrationSubmit}/>}
        {display === 2 && endpoint && <TuiForm style={{width: "100%"}}>
            <TuiFormGroup>
                <TuiFormGroupHeader header="Available services"/>
                <TuiFormGroupContent>
                    <TracardiProAvailableServicesList onServiceClick={handleServiceAddClick}/>
                </TuiFormGroupContent>
            </TuiFormGroup>
            {/*<TuiFormGroup>*/}
            {/*    <TuiFormGroupHeader header="Running services"/>*/}
            {/*    <TuiFormGroupContent>*/}
            {/*        <TracardiProRunningServicesList*/}
            {/*            onEditClick={handleServiceEditClick}*/}
            {/*            refresh={refresh}/>*/}
            {/*    </TuiFormGroupContent>*/}
            {/*</TuiFormGroup>*/}
        </TuiForm>}

        <FormDrawer
            width={550}
            label="Configure"
            onClose={() => setSelectedService(null)}
            open={selectedService !== null}>

            <div style={{padding: 20}}>
                <TracardiProServiceConfigForm
                    service={selectedService}
                    onSubmit={handleServiceSaveClick}
                />
            </div>

        </FormDrawer>

    </div>
}