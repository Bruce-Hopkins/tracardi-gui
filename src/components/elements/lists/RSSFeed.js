import React, {useState} from 'react';
import {XMLParser} from 'fast-xml-parser';
import {Drawer, IconButton, List, ListItem, ListItemText} from '@mui/material';
import {VscBell} from "react-icons/vsc";
import './RssFeed.css';
import {getRssFeed} from "../../../remote_api/endpoints/rss";
import {useFetch} from "../../../remote_api/remoteState";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import ErrorBox from "../../errors/ErrorBox";
import FetchError from "../../errors/FetchError";

const RSSFeed = () => {

    // const [feedItems, setFeedItems] = useState([]);
    const { data: feedItems, isLoading, error } = useFetch(
        ['rssFeed'],
        getRssFeed(),
        (data) => {
            const parser = new XMLParser();
            const result = parser.parse(data);

            // Assuming a standard RSS structure
            const items = result.rss.channel.item;
            return Array.isArray(items) ? items : [items];

        });

    if(isLoading) {
        return <div style={{width: 400, height: "100%"}}><CenteredCircularProgress/></div>
    }

    if(error) {
        return <FetchError error={error}/>
    }

    return (
        <div className="RssFeed" style={{width: 420}}>
            <List>
                {feedItems && feedItems.map((item, index) => (
                    <ListItem key={index} alignItems="flex-start">
                        <ListItemText
                            primary={item.title}
                            secondary={
                                <>
                                    <span dangerouslySetInnerHTML={{__html: item.description}}/>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">Read the post</a>
                                </>
                            }
                            sx={{
                                '.MuiListItemText-primary': {fontSize: '1.35rem'},
                                '.MuiListItemText-secondary': {
                                    fontSize: '1rem',
                                    paddingBottom: "30px",
                                    borderBottom: '1px solid rgba(128,128,128,.3)', // Add border bottom to secondary text
                                    display: 'block' // Ensure block display for the border to take effect
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

const RSSDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    return (
        <div>
            <IconButton onClick={toggleDrawer}>
                <VscBell/>
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <RSSFeed/>
            </Drawer>
        </div>
    );
}

export default RSSDrawer;
