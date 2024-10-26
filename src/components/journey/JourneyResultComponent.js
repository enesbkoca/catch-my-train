import React, { useContext, useEffect } from 'react';
import { MapContext } from '../MapContext';
import { updateJourneyMarkers } from "../../utils/helperFunctions";
import { FriendRides } from "./FriendRides";
import {MeetingDetails} from "./MeetingDetails";

const JourneyResultComponent = ({ journeyResult }) => {
    const { markers, addMarker, removeMarker, stations } = useContext(MapContext);

    useEffect(() => {
        updateJourneyMarkers(journeyResult, stations, addMarker, removeMarker, markers);
    }, [journeyResult, stations]);

    return (
        <div className="journey-result">
            <MeetingDetails meetingOptions={journeyResult.meetingOptions}/>

            <FriendRides friends={journeyResult.friends}/>
        </div>
    );
};

export default JourneyResultComponent;