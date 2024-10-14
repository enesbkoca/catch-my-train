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
                    <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                        <Text fontSize="lg" fontWeight="bold">{friend.name}</Text>
                        {friend.trainRide.map((ride, rideIndex) => (
                            <Box key={rideIndex} mt={2}>
                                <Text>Departure: {ride.station_departure.name} at {ride.ride_departure.toLocaleTimeString()}</Text>
                                <Text>Arrival: {ride.station_arrival.name} at {ride.ride_arrival.toLocaleTimeString()}</Text>
                            </Box>
                        ))}
                    </Box>
                ))}
            </VStack>
            <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" mt={4}>
                <Text fontSize="lg" fontWeight="bold">Meeting Options</Text>
                <Text>Date & Time: {journeyResult.meetingOptions.datetime.toLocaleString()}</Text>
                <Text>Preferred Duration: {journeyResult.meetingOptions.duration}</Text>
                <Text>Actual Duration: {journeyResult.meetingOptions.actual_duration}</Text>
            </Box>
        </div>
    );
};

export default JourneyResultComponent;