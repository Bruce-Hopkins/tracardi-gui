import {JsonForm} from "./JsonForm";
import React, {useEffect, useState} from "react";
import FormSchema from "../../../domain/formSchema";
import MutableMergeRecursive from "../../../misc/recursiveObjectMerge";
import ConfigEditor from "../../flow/editors/ConfigEditor";

export function NodeInitJsonForm({pluginId, formSchema, init, manual, onSubmit}) {

    const [data, setData] = useState(init)
    const [formErrorMessages, setFormErrorMessages] = useState({});
    const [saveOk, setSaveOk] = useState(false);

    useEffect(() => {
        // Reset to default values
        setData(init);
        setSaveOk(false);
        setFormErrorMessages({})
    }, [init])

    const handleValidationData = (result) => {
        if (result.status === true) {

            if (formErrorMessages !== {}) {
                setFormErrorMessages({})
            }

            setData(result.data)  // result.data is validated config
            onSubmit(result.data)
            setSaveOk(true);

        } else {
            if (result.data !== null) {
                setFormErrorMessages(result.data);
                setSaveOk(false);
            }
        }
    }

    const handleSubmit = (config) => {
        const form = new FormSchema(formSchema)
        form.validate(pluginId, config).then(handleValidationData)
    }

    return <ConfigEditor
        config={data}
        manual={manual}
        onConfig={handleSubmit}
        confirmed={saveOk}
        errorMessages={formErrorMessages}
    />
}

export function NodeInitForm({pluginId, init, formSchema, onSubmit}) {

    const [data, setData] = useState({...init})
    const [formErrorMessages, setFormErrorMessages] = useState({});
    const [saveOK, setSaveOk] = useState(false);

    useEffect(() => {
        // Reset to default values
        setData({...init});
        setSaveOk(false);
        setFormErrorMessages({})
    }, [init])

    const handleValidationData = (result) => {
        if (result.status === true) {

            if (formErrorMessages !== {}) {
                setFormErrorMessages({})
            }

            setData(result.data)  // result.data is validated config
            onSubmit(result.data)
            setSaveOk(true);

        } else {
            if (result.data !== null) {
                setFormErrorMessages(result.data);
                setSaveOk(false);
            }
        }
    }

    const handleFormSubmit = () => {
        const form = new FormSchema(formSchema)
        form.validate(pluginId, data).then(handleValidationData)
    }

    const handleFormChange = (value) => {
        setData(MutableMergeRecursive(data, value))
    }

    return <JsonForm
        pluginId={pluginId}
        values={data}
        errorMessages={formErrorMessages}
        schema={formSchema}
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
        confirmed={saveOK}
    />
}