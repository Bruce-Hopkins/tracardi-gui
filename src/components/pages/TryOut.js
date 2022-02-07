import React from "react";
import ListOfDottedInputs from "../elements/forms/ListOfDottedInputs";
import DottedPathInput from "../elements/forms/inputs/DottedPathInput";
import TimeInput from "../elements/forms/inputs/TimeInput";
import KeyValueForm from "../elements/forms/KeyValueForm";
import IconSelector from "../elements/IconSelector";
import ScheduledForm from "../elements/forms/ScheduledForm";
import NewUser from "./NewUser";
import TuiPieChart from "../elements/charts/PieChart";

export default function TryOut() {

  return (
    <div style={{height: "100%", overflow: "auto"}}>
        <DottedPathInput value={"event@id"} onChange={(v)=>console.log(v)} defaultPathValue={'xxx'} defaultSourceValue={"profile"}/>
      <TuiPieChart/>
      <ScheduledForm  />
      <NewUser/>
      <IconSelector value="alert" onChange={(ic) => console.log(ic)} />
      <KeyValueForm value={{ kw: "value" }} onChange={(v) => console.log(v)} />
      <TimeInput />
      <DottedPathInput value={"ala.kk"} onChange={(v) => console.log(v)} forceMode={2} width={300} />
      <ListOfDottedInputs onChange={(x) => console.log(x)} />
    </div>
  );
}
