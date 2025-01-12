import {Button, HStack, Input, Select} from "@chakra-ui/react";
import {handleFriendChange, removeFriend, renderStationOptions} from "../../utils/helperFunctions";
import React from "react";

const FriendInput = ({ friend, index, friends, setFriends, stations }) => (
    <HStack key={index} spacing={3} align="center">
        <Input
            placeholder="Name"
            value={friend.name}
            onChange={(e) => handleFriendChange(index, 'name', e.target.value, friends, setFriends)}
            variant="filled"
            size="md"
        />
        <Select
            value={friend.station}
            onChange={(e) => handleFriendChange(index, 'station', e.target.value, friends, setFriends)}
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
);

export default FriendInput;