import React, {useState} from "react";
import Tabs, {TabCase} from "../../elements/tabs/Tabs";
import "./PageTabs.css";
import PrivateTab from "../../authentication/PrivateTab";
import useTheme from "@mui/material/styles/useTheme";

export default function PageTabs({tabs = {}}) {

    const filteredTabs = tabs.filter((tab) => tab instanceof PrivateTab && tab.isAuth())
    const theme = useTheme()

    const [tab, setTab] = useState(0);
    let i = -1;

    const style = {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.common.black
    }

    return <div className="PageTabs" style={style}>
        <Tabs
            tabs={filteredTabs.map(tab => tab.label)}
            defaultTab={tab}
            onTabSelect={setTab}
            tabStyle={{flex: "initial"}}
            tabContentStyle={{overflow: "initial"}}
        >
            {filteredTabs.map((tab, key) => {
                i = i + 1;
                return <TabCase id={i} key={key}>
                    <div style={{paddingTop: 10, height: "inherit", borderRadius: "inherit"}}>
                        {tab.component}
                    </div>
                </TabCase>
            })}
        </Tabs>
    </div>
}