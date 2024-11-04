import React from "react";
import {getError} from "../../../remote_api/entrypoint";
import {object2dot} from "../../../misc/dottedObject";
import ErrorsBox from "../../errors/ErrorsBox";
import CenteredCircularProgress from "../progress/CenteredCircularProgress";
import {isEmptyObjectOrNull, isNotEmptyArray} from "../../../misc/typeChecking";
import PropertyField from "./PropertyField";
import ActiveTag from "../misc/ActiveTag";
import TuiTags from "../tui/TuiTags";
import IdLabel from "../misc/IconLabels/IdLabel";
import DateValue from "../misc/DateValue";
import ProfileLabel from "../misc/IconLabels/ProfileLabel";
import {profileName} from "../../../misc/formaters";
import IconLabel from "../misc/IconLabels/IconLabel";
import {BsGlobe} from "react-icons/bs";
import {VscLaw} from "react-icons/vsc";
import {Grid} from "@mui/material";
import ProfileEvents from "./ProfileEvents";
import Tabs, {TabCase} from "../tabs/Tabs";
import useTheme from "@mui/material/styles/useTheme";
import NoData from "../misc/NoData";
import {ProfileImage} from "./ProfileImage";
import {displayLocation} from "../../../misc/location";
import {useRequest} from "../../../remote_api/requestClient";
import Tag from "../misc/Tag";
import ProfileCacheDetails from "./ProfileCacheDetails";
import ProfileMergeDetails from "./ProfileMergeDetails";
import "./ProfileInfo.css"
import HorizontalValueBars from "../charts/HorizontalValueBars";

export const ProfileCard = ({profile}) => {
    const profileFullName = profileName(profile)

    return <div style={{display: "flex", gap: 20, padding: 20}}>
        <ProfileImage profile={profile}/>
        <div style={{width: "100%"}}>
            <PropertyField name="Name" labelWidth={60} content={<ProfileLabel label={profileFullName}
                                                                              profileLess={profile === null}/>}/>
            {profile?.metadata?.time?.visit?.current &&
            <PropertyField name="Last visit" labelWidth={60}
                           content={<DateValue date={profile?.metadata.time.visit.current}/>}/>}
            {profile?.data?.devices?.last?.geo?.city && <PropertyField labelWidth={60} name="Location" content={
                <IconLabel
                    value={displayLocation(profile?.data?.devices?.last?.geo)}
                    icon={<BsGlobe size={20} style={{marginRight: 5}}/>}
                />}/>}
        </div>
    </div>
}

export const ProfileData = ({profile}) => {

    const _theme = useTheme()

    const displayPii = window?.CONFIG?.profile?.display?.details?.pii

    const pii = object2dot(profile?.data?.pii, true);
    const traits = object2dot(profile?.traits, true)
    const aux = object2dot(profile?.aux, true)
    const media = object2dot(profile?.data?.media, true)
    const geo = object2dot(profile?.data?.devices?.last?.geo, true)
    const contact = object2dot(profile?.data?.contact, true);
    const job = object2dot(profile?.data?.job, true);
    const loyalty = object2dot(profile?.data?.loyalty, true);
    const identifier = object2dot(profile?.data?.identifier, true);

    const displayFieldChange = (field) => {
        if (profile?.metadata?.fields && field in profile.metadata.fields) {
            return profile.metadata.fields[field]
        }
        return null
    }

    return <Grid container spacing={2} style={{padding: 20}}>
        <Grid item xs={6}>
            <ProfileCard profile={profile}/>
            <fieldset style={{marginBottom: 20}}>
                <legend style={{fontSize: 13}}>Profile metadata</legend>
                <PropertyField name="Primary Id" content={<IdLabel label={profile?.primary_id || <Tag>None</Tag>}/>}/>
                <PropertyField name="Client Id" content={<IdLabel label={profile.id}/>}/>
                {profile?.metadata?.time?.create &&
                <PropertyField name="Created" content={<DateValue date={profile?.metadata?.time?.create}/>}/>}
                {profile?.metadata?.time?.insert &&
                <PropertyField name="Inserted" content={<DateValue date={profile?.metadata?.time?.insert}/>}/>}
                <PropertyField name="Updated" content={<DateValue date={profile?.metadata?.time?.update}/>}/>
                {profile?.metadata?.time?.segmentation &&
                <PropertyField name="Segmented" content={<DateValue date={profile?.metadata?.time?.segmentation}/>}/>}
                {profile?.metadata?.time?.visit?.last &&
                <PropertyField name="Previous Visit" content={<DateValue date={profile?.metadata.time.visit.last}/>}/>}

                {profile?.metadata?.time?.visit?.tz && <PropertyField name="Last Visit Time Zone"
                                                                      content={<IconLabel
                                                                          value={profile?.metadata.time.visit.tz}
                                                                          icon={<BsGlobe size={20}
                                                                                         style={{marginRight: 5}}/>}
                                                                      />}/>}


                {profile?.consents
                && <PropertyField name="Consents"
                                  content={<div className="flexLine" style={{gap: 5}}>
                                      <IconLabel
                                          value={isEmptyObjectOrNull(profile?.consents) ? "None granted" : <TuiTags
                                              size="small"
                                              style={{marginRight: 2}}
                                              tags={Object.getOwnPropertyNames(profile?.consents)}/>}
                                          icon={<VscLaw size={20} style={{marginRight: 5}}/>}/>
                                  </div>}/>}
                <PropertyField name="Status" content={<span className="flexLine">
                    <ActiveTag active={profile?.active} trueLabel="Active" falseLabel="Inactive"/>
                    <ProfileMergeDetails profile={profile}/></span>}/>
                <PropertyField name="Index & TTL" content={<span className="flexLine">
                    {profile?._meta?.index &&
                    <Tag style={{marginRight: 10}} maxWidth={250}> {profile?._meta?.index}</Tag>}
                    <ProfileCacheDetails id={profile?.id}/>
                </span>}/>
            </fieldset>
            <div style={{borderRadius: 5, border: "solid 1px rgba(128,128,128,0.5)"}}>
                <Tabs tabs={["PII", "Contacts", "Traits", "Last GEO", "Media", "Aux"]}
                      tabsStyle={{backgroundColor: _theme.palette.background.paper}}>
                    <TabCase id={0}>
                        <div className="ProfileInfoTab">
                            {displayPii && pii && !isEmptyObjectOrNull(pii) ? Object.keys(pii).map(key => <PropertyField
                                    key={key}
                                    name={(key.charAt(0).toUpperCase() + key.slice(1)).replace("_", " ")}
                                    content={pii[key]}
                                    field={`data.pii.${key}`}
                                    metadata={displayFieldChange(`data.pii.${key}`)}
                                />)
                                : <NoData header="No Personal Data"/>
                            }
                        </div>

                    </TabCase>
                    <TabCase id={1}>
                        <div className="ProfileInfoTab">
                            {displayPii && contact && !isEmptyObjectOrNull(contact) ? Object.keys(contact).map(key => <PropertyField
                                    key={key}
                                    name={(key.charAt(0).toUpperCase() + key.slice(1)).replace("_", " ")}
                                    content={contact[key]}
                                    field={`data.contact.${key}`}
                                    metadata={displayFieldChange(`data.contact.${key}`)}
                                />)
                                : <NoData header="No Contact Data"/>
                            }
                        </div>
                    </TabCase>
                    <TabCase id={2}>
                        <div className="ProfileInfoTab">
                            {traits && !isEmptyObjectOrNull(traits)
                                ? Object.keys(traits).map(key => <PropertyField
                                    key={key}
                                    name={(key.charAt(0).toUpperCase() + key.slice(1)).replace("_", " ")}
                                    content={traits[key]}
                                    field={`traits.${key}`}
                                    metadata={displayFieldChange(`traits.${key}`)}
                                />)

                                : <NoData header="No Traits"/>}
                        </div>
                    </TabCase>
                    <TabCase id={3}>
                        <div className="ProfileInfoTab">
                            {geo && !isEmptyObjectOrNull(geo)
                                ? geo && Object.keys(geo).map(key => <PropertyField
                                key={key}
                                name={(key.charAt(0).toUpperCase() + key.slice(1)).replace("_", " ")}
                                content={geo[key]}
                                field={`data.devices.last.geo.${key}`}
                                metadata={displayFieldChange(`data.devices.last.geo.${key}`)}
                            />)
                                : <NoData header="No Geo Location"/>}
                        </div>
                    </TabCase>
                    <TabCase id={4}>
                        <div className="ProfileInfoTab">
                            {media && !isEmptyObjectOrNull(media)
                                ? media && Object.keys(media).map(key => <PropertyField
                                key={key}
                                name={(key.charAt(0).toUpperCase() + key.slice(1)).replace("_", " ")}
                                content={media[key]}
                                field={`data.media.${key}`}
                                metadata={displayFieldChange(`data.media.${key}`)}
                            />)
                                : <NoData header="No Media"/>}
                        </div>
                    </TabCase>
                    <TabCase id={5}>
                        <div className="ProfileInfoTab">
                            {aux && !isEmptyObjectOrNull(aux)
                                ? aux && Object.keys(aux).map(key => <PropertyField
                                key={key}
                                name={(key.charAt(0).toUpperCase() + key.slice(1)).replace("_", " ")}
                                content={aux[key]}
                                field={`aux.${key}`}
                                metadata={displayFieldChange(`aux.${key}`)}
                            />)
                                : <NoData header="No Auxiliary Data"/>}
                        </div>
                    </TabCase>
                </Tabs>

            </div>
            <div style={{borderRadius: 5, border: "solid 1px rgba(128,128,128,0.5)", marginTop: 20}}>
                <Tabs tabs={["Segment Tags", "Interests", "Preferences"]}
                      tabsStyle={{backgroundColor: _theme.palette.background.paper}}>
                    <TabCase id={0}>
                        <div className="ProfileInfoTab">
                            {isNotEmptyArray(profile?.segments)
                                ? <div className="flexLine" style={{gap: 5}}><TuiTags tags={profile?.segments}/></div>
                                : <NoData header="No Segment Tags"/>}
                        </div>
                    </TabCase>
                    <TabCase id={1}>
                        <div className="ProfileInfoTab">
                            {!isEmptyObjectOrNull(profile?.interests)
                                ? <div><p>Top 15 Interests</p><HorizontalValueBars data={profile?.interests}/></div>
                                : <NoData header="No Interests"/>}
                        </div>
                    </TabCase>
                    <TabCase id={2}>
                        <div className="ProfileInfoTab">
                            {!isEmptyObjectOrNull(profile?.data?.preferences)
                                ? Object.keys(profile?.data?.preferences).map(key => <PropertyField
                                    key={key}
                                    name={key}
                                    content={profile?.data?.preferences[key]}
                                    field={`data.preferences.${key}`}
                                    metadata={displayFieldChange(`data.preferences.${key}`)}
                                />)
                                : <NoData header="No Preferences"/>}

                        </div>
                    </TabCase>
                </Tabs>
            </div>
            <div style={{borderRadius: 5, border: "solid 1px rgba(128,128,128,0.5)", marginTop: 20}}>
                <Tabs tabs={["Job", "Loyalty", "Identifiers", "AnonIds"]}
                      tabsStyle={{backgroundColor: _theme.palette.background.paper}}>
                    <TabCase id={0}>
                        <div className="ProfileInfoTab">
                            {!isEmptyObjectOrNull(job)
                                ? Object.keys(job).map(key => <PropertyField
                                    key={key}
                                    name={key}
                                    content={job[key]}
                                    field={`data.job.${key}`}
                                    metadata={displayFieldChange(`data.job.${key}`)}
                                />)
                                : <NoData header="No Job Data"/>
                            }
                        </div>
                    </TabCase>
                    <TabCase id={1}>
                        <div className="ProfileInfoTab">
                            {!isEmptyObjectOrNull(loyalty)
                                ? Object.keys(loyalty).map(key => <PropertyField
                                    key={key}
                                    name={key}
                                    content={loyalty[key]}
                                    field={`data.loyalty.${key}`}
                                    metadata={displayFieldChange(`data.loyalty.${key}`)}
                                />)
                                : <NoData header="No Loyalty Data"/>
                            }
                        </div>
                    </TabCase>
                    <TabCase id={2}>
                        <div className="ProfileInfoTab">
                            {!isEmptyObjectOrNull(identifier)
                                ? Object.keys(identifier).map(key => <PropertyField
                                    key={key}
                                    name={key}
                                    content={identifier[key]}
                                    field={`data.identifier.${key}`}
                                    metadata={displayFieldChange(`data.identifier.${key}`)}
                                />)
                                : <NoData header="No Identifiers"/>
                            }
                        </div>
                    </TabCase>
                    <TabCase id={3}>
                        <div className="ProfileInfoTab">
                            {isNotEmptyArray(profile?.ids)
                                ? <TuiTags tags={profile?.ids} style={{margin: 2}}/>
                            : <NoData header="No Ids"/>}
                        </div>
                    </TabCase>
                </Tabs>
            </div>
        </Grid>
        <Grid item xs={6}>
            <fieldset style={{marginBottom: 20}}>
                <legend style={{fontSize: 13}}>Last events</legend>
                <ProfileEvents profileId={profile?.id}/>
            </fieldset>
        </Grid>
    </Grid>
}

const ProfileInfo = ({id}) => {

    const [profile, setProfile] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const {request} = useRequest()

    React.useEffect(() => {
        let isSubscribed = true;
        setError(null);
        setLoading(true);
        if (id) {
            request({
                url: "/profile/" + id
            })
                .then(response => {
                    if (isSubscribed && response?.data) {
                        setProfile(response.data);
                    }
                })
                .catch(e => {
                    if (isSubscribed) setError(getError(e))
                })
                .finally(() => {
                    if (isSubscribed) setLoading(false)
                })
        }
        return () => isSubscribed = false;
    }, [id])

    if (error) {
        return <ErrorsBox errorList={error}/>
    }

    if (loading) {
        return <CenteredCircularProgress/>
    }

    return <ProfileData profile={profile}/>
}

export default ProfileInfo;