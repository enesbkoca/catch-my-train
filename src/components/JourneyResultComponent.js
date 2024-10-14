import React, { useContext } from 'react';
import { MapContext } from './MapContext';
import { Box, Text, VStack} from '@chakra-ui/react';

const JourneyResultComponent = ({ journeyResult }) => {
    // const { markers, addMarker, removeMarker } = useContext(MapContext);
    //
    // useEffect(() => {
    //     // Clear existing markers
    //     markers.forEach(marker => removeMarker(marker.id));
    //
    //     // Add markers for each friend's journey
    //     journeyResult.friends.forEach(friend => {
    //         friend.trainRide.forEach(ride => {
    //             addMarker({ lat: ride.station_departure.lat, lng: ride.station_departure.lng, label: ride.station_departure.name });
    //             addMarker({ lat: ride.station_arrival.lat, lng: ride.station_arrival.lng, label: ride.station_arrival.name });
    //         });
    //     });
    // }, [journeyResult, addMarker, removeMarker, markers]);

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
                                    <Text color="gray.600">Departure: {ride.station_departure.name} at {ride.ride_departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                    <Text color="gray.600">Arrival: {ride.station_arrival.name} at {ride.ride_arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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
                </Box>
            </VStack>
        </div>
    );
};

export default JourneyResultComponent;