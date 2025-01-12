import {Button, HStack, Input} from "@chakra-ui/react";
import {addFriend} from "../../utils/helperFunctions";
import React from "react";

const AddFriendButton = ({ friends, setFriends, addMarker }) => (
    <HStack spacing={3} align="center">
        <Input size="md" style={{ visibility: 'hidden' }} /> {/* Placeholder input */}
        <Button
            style={{ aspectRatio: 1 }}
            colorScheme="teal"
            onClick={() => addFriend(friends, setFriends, addMarker)}
        >
            +
        </Button>
    </HStack>
);

export default AddFriendButton;