import React, { useState, useContext, useEffect } from 'react';
import { MapContext } from '../mapbox/MapContext';
import {
    getOneHourAheadTime,
    updateFriendInputMarkers,
} from "../../utils/helperFunctions";

import { Button, VStack, HStack, Divider } from '@chakra-ui/react';
import MeetingOptions from "./MeetingOptions";
import AddFriendButton from "./AddFriendButton";
import FriendInput from "./FriendInput";

const PlannerInput = ({ onSubmit }) => {
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
        updateFriendInputMarkers(friends, stations, markers, addMarker, removeMarker, updateMarker);
    }, [friends, stations]);

    useEffect(() => {
        console.log("Markers have been updated: ", markers);
    }, [markers]);

    return (
        <div className="journey-result">
                <VStack spacing={4} align="stretch">
                    {friends.map((friend, index) => (
                        <FriendInput
                            key={index}
                            friend={friend}
                            index={index}
                            friends={friends}
                            setFriends={setFriends}
                            stations={stations}
                        />
                    ))}
                    {friends.length < 5 && <AddFriendButton friends={friends} setFriends={setFriends} addMarker={addMarker} />}
                    <Divider />
                    <MeetingOptions meetingOptions={meetingOptions} setMeetingOptions={setMeetingOptions} stations={stations} />
                    <HStack justify="center">
                        <Button colorScheme="blue" onClick={() => onSubmit(friends, meetingOptions)}>
                            Plan the perfect journey
                        </Button>
                    </HStack>
                </VStack>
        </div>
    );
};

export default PlannerInput;