import React, {useState} from 'react';
import {Drawer, IconButton, List, ListItem, ListItemText} from '@mui/material';
import {VscBell} from "react-icons/vsc";
import './Feed.css';
import {getFeed} from "../../../remote_api/endpoints/feed";
import {useFetch} from "../../../remote_api/remoteState";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import FetchError from "../../errors/FetchError";
import {addParamsToUrl} from "../../../misc/UrlPrefix";
import storageValue from "../../../misc/localStorageDriver";

const Feed = () => {

    let urlParams = {
        utm_source: 'tracardi',
        utm_medium: 'rss'
    }

    const profileID = new storageValue('tracardi-profile-id').read(null)

    if(profileID) {
        urlParams["__tr_pid"] = profileID
    }


    const { data: feedItems, isLoading, error } = useFetch(
        ['feed'],
        getFeed(),
        (data) => {
            return data;
        });

    if(isLoading) {
        return <div style={{width: 400, height: "100%"}}><CenteredCircularProgress/></div>
    }

    if(error) {
        return <FetchError error={error}/>
    }

    return (
        <div className="RssFeed" style={{width: 420}}>
            <div style={{fontSize: '1.6rem', padding: 20, borderBottom: '1px solid rgba(128,128,128,.5)'}}>What's new at <span className="Tracardi">Tracardi</span>.</div>
            <List>
                {feedItems && feedItems.map((item, index) => (
                    <ListItem key={index} alignItems="flex-start">
                        <ListItemText
                            primary={item.title}
                            secondary={
                                <>
                                    <span style={{display: "block", marginTop: 10}} dangerouslySetInnerHTML={{__html: item.description}}/>
                                    <a style={{display: "block", marginTop: 10}} href={addParamsToUrl(item.link,urlParams)} target="_blank" rel="noopener noreferrer">Read the post</a>
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

const FeedDrawer = () => {
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
                <Feed/>
            </Drawer>
        </div>
    );
}

export default FeedDrawer;
