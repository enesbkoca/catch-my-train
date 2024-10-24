import React, {useContext, useEffect} from 'react';
import { MapContext } from './MapContext';
import { Box, Text, VStack, HStack, Divider} from '@chakra-ui/react';
import { getColorByFriendId, updateJourneyMarkers } from "../utils/helperFunctions";
import { FaArrowRight } from 'react-icons/fa';

// Function to render a friend's train rides
const RenderRides = ({ rides }) => {
    if (!rides || rides.length === 0) return null; // If no rides, do nothing
    const firstRide = rides[0];
    const lastRide = rides[rides.length - 1];

    return (
        <HStack spacing={6} align="center" justifyContent="space-around">
            {/* Display the departure station of the first ride */}
            <VStack spacing={1} align="center">
                <Text fontSize="md" fontWeight="bold" color="gray.800">{firstRide.station_departure}</Text>
                <Text fontSize="sm" color="gray.500">
                    {firstRide.ride_departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </VStack>

            {/* Loop through rides to display arrows and intermediate stations */}
            {rides.slice(0, -1).map((ride, index) => (
                <React.Fragment key={index}>
                    <FaArrowRight size={20} color="gray" />

                    <VStack spacing={1} align="center">
                        <Text fontSize="md" fontWeight="bold" color="gray.800">{ride.station_arrival}</Text>
                        <HStack justify="space-between" width="100%">
                            <Text fontSize="sm" color="gray.500">
                                {ride.ride_arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            {rides[index + 1] && (
                                <Text fontSize="sm" color="gray.500">
                                    {rides[index + 1].ride_departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            )}
                        </HStack>
                    </VStack>
                </React.Fragment>
            ))}

            {/* Display the arrival station of the last ride */}
            <FaArrowRight size={20} color="gray" />
            <VStack spacing={1} align="center">
                <Text fontSize="md" fontWeight="bold" color="gray.800">{lastRide.station_arrival}</Text>
                <Text fontSize="sm" color="gray.500">
                    {lastRide.ride_arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </VStack>
        </HStack>
    );
};


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
                        backgroundColor={getColorByFriendId(friend.friend_id, true) } // Set background color based on friend_id
                    >
                        <Text fontSize="lg" fontWeight="bold" color={getColorByFriendId(friend.friend_id) + '.800'}>{friend.name}</Text>
                        <Divider my={2} />

                        {/* Render the rides for each friend */}
                        <RenderRides rides={friend.trainRide} />
                    </Box>
                ))}

                {/* Meeting options section */}
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