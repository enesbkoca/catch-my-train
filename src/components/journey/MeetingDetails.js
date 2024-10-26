import {Box, Text} from "@chakra-ui/react";
import {getDurationDifference} from "../../utils/helperFunctions";
import React from "react";


export const MeetingDetails = ({meetingOptions}) => {
    return (<Box
                p={3}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                mt={3}
                maxW="lg"
                backgroundColor="blue.50"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                _hover={{ backgroundColor: "blue.100", boxShadow: "xl", transform: "scale(1.02)" }}
                transition="all 0.2s"
            >
                <Box>
                    <Text fontSize="md" fontWeight="semibold" color="blue.800" mb={1}>
                        {new Date(meetingOptions.datetime).toLocaleString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        @ {meetingOptions.meeting_station}
                    </Text>
                </Box>
        
                <Box textAlign="right">
                    <Text fontSize="lg" fontWeight="semibold" color="gray.500">
                        Duration:
                    </Text>
                    <Text fontSize="md" color="gray.700">
                        {meetingOptions.actual_duration} min
                        {getDurationDifference(meetingOptions) !== 0 && (
                            <Text as="span" color="gray.500">
                                &nbsp;({getDurationDifference(meetingOptions)} min)
                            </Text>
                        )}
                    </Text>
                </Box>
            </Box>)
}