import React, { useContext, useEffect } from 'react';
import { MapContext } from './MapContext';
import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react';
import { getColorByFriendId, updateJourneyMarkers, getDurationDifference } from "../utils/helperFunctions";
import { FaArrowRight } from 'react-icons/fa';

const RenderRides = ({ rides }) => {
    if (!rides || rides.length === 0) return null; // If no rides, do nothing
    const firstRide = rides[0];
    const lastRide = rides[rides.length - 1];

    return (
        <HStack spacing={2} align="center" justifyContent="space-around">
            <VStack spacing={1} align="center">
                <Text fontSize="md" fontWeight="bold" color="gray.800">{firstRide.station_departure}</Text>
                <Text fontSize="sm" color="gray.500">
                    {firstRide.ride_departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </VStack>

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
        updateJourneyMarkers(journeyResult, stations, addMarker, removeMarker, markers);
    }, [journeyResult, stations]);

    return (
        <div className="journey-result">
            {/* Meeting options section */}
            <Box
                p={3}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                mt={3}
                maxW="lg"
                backgroundColor="blue.50"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                _hover={{ backgroundColor: "blue.100", boxShadow: "xl", transform: "scale(1.02)" }}
                transition="all 0.2s"
            >
                <Box>
                    <Text fontSize="md" fontWeight="semibold" color="blue.800" mb={1}>
                        {new Date(journeyResult.meetingOptions.datetime).toLocaleString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        @ {journeyResult.meetingOptions.meeting_station}
                    </Text>
                </Box>

                <Box textAlign="right">
                    <Text fontSize="lg" fontWeight="semibold" color="gray.500">
                        Duration:
                    </Text>
                    <Text fontSize="md" color="gray.700">
                        {journeyResult.meetingOptions.actual_duration} min
                        {getDurationDifference(journeyResult.meetingOptions) !== 0 && (
                            <Text as="span" color="gray.500">
                                &nbsp;({getDurationDifference(journeyResult.meetingOptions)} min)
                            </Text>
                        )}
                    </Text>
                </Box>
            </Box>

            <VStack spacing={3} align="stretch">
                {journeyResult.friends.map((friend, index) => (
                    <Box
                        key={index}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        boxShadow="md"
                        backgroundColor={getColorByFriendId(friend.friend_id, true)}
                        _hover={{ backgroundColor: getColorByFriendId(friend.friend_id, true) + '.100', boxShadow: "lg" }}
                        transition="all 0.2s"
                    >
                        <Text
                            fontSize="lg"
                            margin={0}
                            fontWeight="bold"
                            align="center"
                            color={getColorByFriendId(friend.friend_id) + '.800'}>
                            {friend.name}
                        </Text>
                        <Divider my={2} margin={1} />

                        {/* Render the rides for each friend */}
                        <RenderRides align="center" rides={friend.trainRide} />
                    </Box>
                ))}
            </VStack>
        </div>
    );
};

export default JourneyResultComponent;