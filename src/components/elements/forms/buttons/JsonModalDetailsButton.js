import DataTreeDialog from "../../dialog/DataTreeDialog";
import React, {useState} from "react";
import {VscJson} from "react-icons/vsc";
import Button from "../Button";

export function JsonModalButton({data, size="small"}) {

    const [jsonData, setJsonData] = useState(null);

    const handleJsonClick = (data) => {
        setJsonData(data)
    }

    return <>
        <Button label="Json" size={size} icon={<VscJson size={20}/>} onClick={() => handleJsonClick(data)}/>
        {jsonData && <DataTreeDialog open={jsonData !== null}
                                     data={jsonData}
                                     onClose={() => setJsonData(null)}/>}
    </>
}