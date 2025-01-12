import React from 'react';
import Select from 'react-select';
import { HStack, Input, Button, Box } from '@chakra-ui/react'; // Import Box
import { handleFriendChange, removeFriend } from "../../utils/helperFunctions";

const FriendInput = ({ friend, index, friends, setFriends, stations }) => {
    const options = stations.map(station => ({ value: station.name, label: station.name }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '100%',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 2,
        }),
    };

    return (
        <HStack key={index} spacing={3} align="center">
            <Input
                placeholder="Name"
                value={friend.name}
                onChange={(e) => handleFriendChange(index, 'name', e.target.value, friends, setFriends)}
                variant="filled"
                size="md"
            />
            <Box width="100%">
                <Select
                    options={options}
                    value={options.find(option => option.value === friend.station)}
                    onChange={(selectedOption) => {
                        handleFriendChange(index, 'station', selectedOption ? selectedOption.value : '', friends, setFriends);
                    }}
                    isSearchable
                    placeholder="Starting Station"
                    styles={customStyles}
                />
            </Box>
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
};

export default FriendInput;