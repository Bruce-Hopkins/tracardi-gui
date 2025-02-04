import React, {useEffect} from "react";
import RuleRow from "../elements/lists/rows/RuleRow";
import {asyncRemote} from "../../remote_api/entrypoint";
import CircularProgress from "@mui/material/CircularProgress";

export default function FlowRules({flowName, id, refresh}) {

    const [rules, setRules] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
            setLoading(true);
            asyncRemote({
                url: '/rules/by_flow/' + id
            }).then((response) => {
                if (response) {
                    setRules(response.data)
                }
            }).catch((e) => {

            }).finally(() => {
                setLoading(false);
            })
        },
        [id, refresh]
    )

    const RulesList = ({flow, rules}) => {
        return rules.map((rule, index) => {
            return <RuleRow data={rule} flow={flow} key={index}/>
        })
    }

    return <div>
        {loading && <CircularProgress/>}
        {!loading && <RulesList flow={flowName} rules={rules}/>}
    </div>
}