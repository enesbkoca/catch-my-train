import React, { useState, useContext, useEffect } from 'react';
import { MapContext } from '../mapbox/MapContext';
import {
    getOneHourAheadTime,
    updateFriendInputMarkers,
    handleFriendChange,
    renderStationOptions,
    removeFriend,
    addFriend,
    handleMeetingChange,
    adjustToLocalTime
} from "../../utils/helperFunctions";
import { Box, Button, Input, Select, VStack, HStack, Divider, Text } from '@chakra-ui/react';

const FriendInputComponent = ({ onSubmit }) => {
    const { markers, addMarker, removeMarker, updateMarker, stations } = useContext(MapContext);
    const [friends, setFriends] = useState([
        { name: 'Jack', station: 'Amsterdam Centraal', friend_id: 0 },
        { name: 'Alice', station: 'Rotterdam Centraal', friend_id: 1 }
    ]);
    const [meetingOptions, setMeetingOptions] = useState({
        datetime: getOneHourAheadTime(),
        duration: '03:00',
        meetingStation: 'Utrecht Centraal'
    });

    useEffect(() => {
        // TODO: Also display the meeting station marker

        updateFriendInputMarkers(friends, stations, markers, addMarker, removeMarker, updateMarker);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friends, stations]);

    useEffect(() => {
        console.log("Markers have been updated: ", markers);
    }, [markers]);

    return (
        <Box className="friend-input" p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" backgroundColor="gray.100">
            <VStack spacing={4} align="stretch">
                {friends.map((friend, index) => (
                    <HStack key={index} spacing={3} align="center">
                        <Input
                            id="friend-name"
                            placeholder="Name"
                            value={friend.name}
                            onChange={(e) => handleFriendChange(index, 'name', e.target.value, friends, setFriends)}
                            variant="filled"
                            size="md"
                        />
                        <Select
                            id="starting-station"
                            value={friend.station}
                            onChange={(e) => {
                                handleFriendChange(index, 'station', e.target.value, friends, setFriends);
                            }}
                            placeholder="Starting Station"
                        >
                            {renderStationOptions(stations)}
                        </Select>
                        <Button
                            style={{ aspectRatio: 1 }}
                            colorScheme="orange"
                            onClick={() => removeFriend(index, friends, setFriends)}
                            isDisabled={friends.length < 3}
                        >
                            &ndash;
                        </Button>
                    </HStack>
                ))}
                    {friends.length < 5 && (
                        <HStack key={`hidden-0`} spacing={3} align="center">
                            <Input
                                id="hidden-input"
                                size="md"
                                style={{ visibility: 'hidden' }}
                            />
                            <Button
                                style={{ aspectRatio: 1 }}
                                colorScheme="teal" // Softer color for the add button
                                onClick={() => addFriend(friends, setFriends, addMarker)}
                            >
                                +
                            </Button>
                        </HStack>
                    )}
                <Divider />

                <HStack spacing={3} justify="space-between">
                    <Text fontWeight="bold">Meeting Station</Text>
                    <Text fontWeight="bold">Date & Time</Text>
                    <Text fontWeight="bold">Duration</Text>
                </HStack>

                <HStack spacing={3}>
                    <Select
                        id="meeting-station"
                        value={meetingOptions.meetingStation}
                        onChange={(e) => handleMeetingChange("meetingStation", e.target.value, meetingOptions, setMeetingOptions)}
                        placeholder="Meeting Station"
                    >
                        {renderStationOptions(stations)}
                    </Select>
                    <Input
                        type="datetime-local"
                        id="meeting-datetime"
                        value={adjustToLocalTime(meetingOptions.datetime)}
                        onChange={(e) => handleMeetingChange("datetime", new Date(e.target.value), meetingOptions, setMeetingOptions)}
                        variant="filled"
                        size="md"
                    />
                    <Input
                        type="time"
                        id="meeting-duration"
                        value={meetingOptions.duration}
                        onChange={(e) => handleMeetingChange("duration", e.target.value, meetingOptions, setMeetingOptions)}
                        variant="filled"
                        size="md"
                    />
                </HStack>

                <HStack justify="center">
                    <Button
                        colorScheme="blue" // Softer color for the submit button
                        onClick={() => onSubmit(friends, meetingOptions)}
                    >
                        Plan the perfect journey
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default FriendInputComponent;
