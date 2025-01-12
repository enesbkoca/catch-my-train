import {Box, Divider, HStack, Text, VStack} from "@chakra-ui/react";
import React from "react";
import {FaArrowRight} from "react-icons/fa";
import {getColorByFriendId, iso8601ToLocalTime} from "../../utils/helperFunctions";

export const Trips = ({ tripInformation }) => {

    return(<VStack spacing={3} align="stretch">
                {tripInformation.map((trip, index) => (
                    <Box
                        key={index}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        boxShadow="md"
                        backgroundColor={getColorByFriendId(trip.friend_id, true)}
                        _hover={{ backgroundColor: getColorByFriendId(trip.friend_id, true) + '.100', boxShadow: "lg" }}
                        transition="all 0.2s"
                    >
                        <Text
                            fontSize="lg"
                            margin={0}
                            fontWeight="bold"
                            align="center"
                            color={getColorByFriendId(trip.friend_id) + '.800'}>
                            {trip.name}
                        </Text>
                        <Divider my={2} margin={1} />

                        {/* Render the rides for each trip */}

                        <RenderRides align="center" trips={trip.trips} optimumTripIdx={trip.optimumTripIdx} />
                    </Box>
                ))}
            </VStack>)
}

const RenderRides = ({ trips, optimumTripIdx }) => {
    const optimumTrip = trips.find(trip => trip.idx === optimumTripIdx).legs;

    if (!optimumTrip || optimumTrip.length === 0) return null; // If no optimumTrip, do nothing
    const firstRide = optimumTrip[0];
    const lastRide = optimumTrip[optimumTrip.length - 1];

    return (
        <HStack spacing={2} align="center" justifyContent="space-around">
            <VStack spacing={1} align="center">
                <Text fontSize="md" fontWeight="bold" color="gray.800">{firstRide.origin.name}</Text>
                <Text fontSize="sm" color="gray.500">
                    {iso8601ToLocalTime(firstRide.origin.plannedDateTime)}
                </Text>
            </VStack>

            {optimumTrip.slice(0, -1).map((ride, index) => (
                <React.Fragment key={index}>
                    <FaArrowRight size={20} color="gray" />
                    <VStack spacing={1} align="center">
                        <Text fontSize="md" fontWeight="bold" color="gray.800">{ride.destination.name}</Text>
                        <HStack justify="space-between" width="100%">
                            <Text fontSize="sm" color="gray.500">
                                {iso8601ToLocalTime(ride.destination.plannedDateTime)}
                            </Text>
                            {optimumTrip[index + 1] && (
                                <Text fontSize="sm" color="gray.500">
                                    {iso8601ToLocalTime(optimumTrip[index + 1].origin.plannedDateTime)}
                                </Text>
                            )}
                        </HStack>
                    </VStack>
                </React.Fragment>
            ))}

            <FaArrowRight size={20} color="gray" />
            <VStack spacing={1} align="center">
                <Text fontSize="md" fontWeight="bold" color="gray.800">{lastRide.destination.name}</Text>
                <Text fontSize="sm" color="gray.500">
                    {iso8601ToLocalTime(lastRide.destination.plannedDateTime)}

                </Text>
            </VStack>
        </HStack>
    );
};