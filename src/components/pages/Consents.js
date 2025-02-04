import React, {useCallback} from "react";
import "../elements/lists/CardBrowser.css";
import CardBrowser from "../elements/lists/CardBrowser";
import SquareCard from "../elements/lists/cards/SquareCard";
import {VscLaw} from "react-icons/vsc";
import ConsentDetails from "../elements/details/ConsentDetails";
import ConsentForm from "../elements/forms/ConsentForm";


export default function  Consents() {

    const urlFunc= useCallback((query) => ('/consents/type/by_tag' + ((query) ? "?query=" + query : "")),[]);
    const addFunc = useCallback((close) => <ConsentForm onSaveComplete={close}/>,[]);
    const detailsFunc= useCallback((id, close) => <ConsentDetails id={id} onDeleteComplete={close} onEditComplete={close}/>, [])

    const flows = (data, onClick) => {
        return data?.grouped && Object.entries(data?.grouped).map(([category, plugs], index) => {
            return <div className="CardGroup" key={index}>
                <header>{category}</header>
                <div>
                    {plugs.map((row, subIndex) => {
                        return <SquareCard key={index + "-" + subIndex}
                                           id={row?.id}
                                           icon={<VscLaw size={45}/>}
                                           status={row?.enabled}
                                           name={row?.name}
                                           description={row?.description}
                                           onClick={() => onClick(row?.id)}
                        />
                    })}
                </div>
            </div>
        })
    }

    return <CardBrowser
        label="Consent types"
        description="List of defined consent types. You may filter this list by consent name in the upper search box."
        urlFunc={urlFunc}
        cardFunc={flows}
        buttomLabel="New consent type"
        buttonIcon={<VscLaw size={20} style={{marginRight: 10}}/>}
        drawerDetailsTitle="Consent type details"
        drawerDetailsWidth={900}
        detailsFunc={detailsFunc}
        drawerAddTitle="New consent type"
        drawerAddWidth={600}
        addFunc={addFunc}
    />
}
