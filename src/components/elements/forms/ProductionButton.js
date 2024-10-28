import Button from "./Button";
import React, {useContext} from "react";
import {DataContext} from "../../AppBox";
import envs from "../../../envs";

export default function ProductionButton(props) {
    const productionContext = useContext(DataContext)

    return <Button {...props} disabled={envs.allowUpdatesOnProduction === false && productionContext === true}/>
}