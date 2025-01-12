import {HStack, Input, Select, Text} from "@chakra-ui/react";
import {adjustToLocalTime, handleMeetingChange, renderStationOptions} from "../../utils/helperFunctions";
import React from "react";

const MeetingOptions = ({ meetingOptions, setMeetingOptions, stations }) => (
    <>
        <HStack spacing={3} justify="space-between">
            <Text fontWeight="bold">Meeting Station</Text>
            <Text fontWeight="bold">Date & Time</Text>
            <Text fontWeight="bold">Duration</Text>
        </HStack>
        <HStack spacing={3}>
            <Select
                value={meetingOptions.meetingStation}
                onChange={(e) => handleMeetingChange("meetingStation", e.target.value, meetingOptions, setMeetingOptions)}
                placeholder="Meeting Station"
            >
                {renderStationOptions(stations)}
            </Select>
            <Input
                type="datetime-local"
                value={adjustToLocalTime(meetingOptions.datetime)}
                onChange={(e) => handleMeetingChange("datetime", new Date(e.target.value), meetingOptions, setMeetingOptions)}
                variant="filled"
                size="md"
            />
            <Input
                type="time"
                value={meetingOptions.duration}
                onChange={(e) => handleMeetingChange("duration", e.target.value, meetingOptions, setMeetingOptions)}
                variant="filled"
                size="md"
            />
        </HStack>
    </>
);

export default MeetingOptions;