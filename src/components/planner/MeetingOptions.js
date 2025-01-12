import React from 'react';
import Select from 'react-select';
import { HStack, Input, Text, Box } from "@chakra-ui/react"; // Import Box
import { adjustToLocalTime, handleMeetingChange, renderStationOptions } from "../../utils/helperFunctions";

const MeetingOptions = ({ meetingOptions, setMeetingOptions, stations }) => {
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
        <>
            <HStack spacing={3} justify="space-between">
                <Text fontWeight="bold">Meeting Station</Text>
                <Text fontWeight="bold">Date & Time</Text>
            </HStack>
            <HStack spacing={3}>
                <Box width="100%">
                    <Select
                        options={options}
                        value={options.find(option => option.value === meetingOptions.meetingStation)}
                        onChange={(selectedOption) =>
                            handleMeetingChange("meetingStation", selectedOption ? selectedOption.value : null, meetingOptions, setMeetingOptions)
                        }
                        isSearchable
                        placeholder="Meeting Station"
                        styles={customStyles}
                    />
                </Box>
                <Input
                    type="datetime-local"
                    value={adjustToLocalTime(meetingOptions.datetime)}
                    onChange={(e) => handleMeetingChange("datetime", new Date(e.target.value), meetingOptions, setMeetingOptions)}
                    variant="filled"
                    size="md"
                />
            </HStack>
        </>
    );
};

export default MeetingOptions;