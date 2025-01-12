import React, { useContext, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

import { MapContext } from '../mapbox/MapContext';
import { updateJourneyMarkers } from "../../utils/helperFunctions";
import { Trips } from "./Trips";
import { MeetingDetails } from "./MeetingDetails";

const JourneyResultComponent = ({ tripInformation, meetingOptions }) => {
    const { markers, addMarker, stations, polylines, addPolyline, removeAllMapArtifacts } = useContext(MapContext);

    useEffect(() => {
        updateJourneyMarkers(tripInformation, meetingOptions, stations, addMarker, markers, addPolyline, removeAllMapArtifacts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tripInformation, meetingOptions, stations]);

    useEffect(() => {
        console.log(polylines);
    }, [polylines]);

    return (
        <div className="journey-result">
            <Text fontSize="3xl" fontWeight="semibold" color="teal.600" mb={-5}>
                Your Journey Plan
            </Text>

            <MeetingDetails meetingOptions={meetingOptions}/>

            <Trips tripInformation={tripInformation}/>
        </div>
    );
};

export default JourneyResultComponent;