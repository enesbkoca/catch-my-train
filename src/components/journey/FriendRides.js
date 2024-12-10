import {Box, Divider, HStack, Text, VStack} from "@chakra-ui/react";
import React from "react";
import {FaArrowRight} from "react-icons/fa";
import {getColorByFriendId} from "../../utils/helperFunctions";

export const FriendRides = ({friends}) => {
    return(<VStack spacing={3} align="stretch">
                {friends.map((friend, index) => (
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

                        <RenderRides align="center" trips={friend.trips} optimumTripIdx={friend.optimumTripIdx} />
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
                    {firstRide.origin.plannedDateTime}
                    {/*{firstRide.origin.plannedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}*/}
                </Text>
            </VStack>

            {optimumTrip.slice(0, -1).map((ride, index) => (
                <React.Fragment key={index}>
                    <FaArrowRight size={20} color="gray" />
                    <VStack spacing={1} align="center">
                        <Text fontSize="md" fontWeight="bold" color="gray.800">{ride.destination.name}</Text>
                        <HStack justify="space-between" width="100%">
                            <Text fontSize="sm" color="gray.500">
                                {ride.destination.plannedDateTime}
                                {/*{ride.destination.plannedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}*/}
                            </Text>
                            {optimumTrip[index + 1] && (
                                <Text fontSize="sm" color="gray.500">
                                    {optimumTrip[index + 1].origin.plannedDateTime}
                                    {/*{optimumTrip[index + 1].origin.plannedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}*/}
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
                    {lastRide.destination.plannedDateTime}
                    {/*{lastRide.destination.plannedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}*/}
                </Text>
            </VStack>
        </HStack>
    );
};