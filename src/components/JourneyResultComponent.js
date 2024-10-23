import React, {useContext, useEffect} from 'react';
import { MapContext } from './MapContext';
import { Box, Text, VStack, HStack, Divider} from '@chakra-ui/react';
import {updateJourneyMarkers} from "../utils/helperFunctions";

const JourneyResultComponent = ({ journeyResult }) => {
    const { markers, addMarker, removeMarker, stations } = useContext(MapContext);

    useEffect(() => {
        console.log(stations);
        updateJourneyMarkers(journeyResult, stations, addMarker, removeMarker, markers);
        // eslint-disable-next-line
    }, [journeyResult, stations]);

    useEffect(() => {
        console.log("Markers have been updated: ", markers);
    }, [markers]);

    return (
        <div className="journey-result">
            <VStack spacing={4} align="stretch">
                {journeyResult.friends.map((friend, index) => (
                    <Box
                        key={index}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        boxShadow="md"
                        backgroundColor="blue.50"
                    >
                        <Text fontSize="lg" fontWeight="bold" color="blue.800">{friend.name}</Text>
                        <Divider my={2} />
                        {friend.trainRide.map((ride, rideIndex) => (
                            <Box key={rideIndex} mt={2} p={3} borderWidth="1px" borderRadius="md" backgroundColor="gray.100">
                                <Text fontSize="md" fontWeight="semibold" color="teal.600">
                                    Train Ride {rideIndex + 1}
                                </Text>
                                <HStack justify="space-between">
                                    <Text color="gray.600">
                                        Departure: {ride.station_departure} at {ride.ride_departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                    <Text color="gray.600">
                                        Arrival: {ride.station_arrival} at {ride.ride_arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </HStack>
                            </Box>
                        ))}
                    </Box>
                ))}
                <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="md"
                    mt={4}
                    backgroundColor="green.50"
                >
                    <Text fontSize="lg" fontWeight="bold" color="green.800">Meeting Options</Text>
                    <Divider my={2} />
                    <Text color="gray.600">Date & Time: {journeyResult.meetingOptions.datetime.toLocaleString()}</Text>
                    <Text color="gray.600">Preferred Duration: {journeyResult.meetingOptions.duration}</Text>
                    <Text color="gray.600">Actual Duration: {journeyResult.meetingOptions.actual_duration}</Text>
                    <Text color="gray.600" mt={2}>
                        Meeting Station: {journeyResult.meetingOptions.meeting_station}
                    </Text>
                </Box>
            </VStack>
        </div>
    );


};

export default JourneyResultComponent;