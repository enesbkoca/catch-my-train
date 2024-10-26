import React, { useContext, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { MapContext } from '../mapbox/MapContext';
import { updateJourneyMarkers } from "../../utils/helperFunctions";
import { FriendRides } from "./FriendRides";
import {MeetingDetails} from "./MeetingDetails";

const JourneyResultComponent = ({ journeyResult }) => {
    const { markers, addMarker, removeMarker, stations, polylines, addPolyline } = useContext(MapContext);

    useEffect(() => {
        updateJourneyMarkers(journeyResult, stations, addMarker, removeMarker, markers, addPolyline);
    }, [journeyResult, stations]);

    useEffect(() => {
        console.log(polylines);
    }, [polylines]);

    return (
        <div className="journey-result">
            <Text fontSize="3xl" fontWeight="semibold" color="teal.600" mb={-5}>
                Your Journey Plan
            </Text>

            <MeetingDetails meetingOptions={journeyResult.meetingOptions}/>

            <FriendRides friends={journeyResult.friends}/>
        </div>
    );
};

export default JourneyResultComponent;