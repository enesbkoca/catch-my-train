import React from 'react';
import { Box, VStack, Heading, Text, Button, useBreakpointValue, SimpleGrid } from '@chakra-ui/react'; // Import necessary components
import MapComponent from "../components/MapComponent";
import { MapProvider } from "../components/MapContext";

const HomePage = () => {
    return (
        <div>
            <Box position="relative" height="100vh" width="100%">
                {/* Background Map */}
                <MapProvider>
                    <MapComponent />
                </MapProvider>

                {/* Overlay Box for Content */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    backgroundColor="rgba(0, 0, 0, 0.4)"
                    color="white"
                    padding={useBreakpointValue({ base: "10px", md: "20px" })}
                    zIndex={100}
                >
                    <VStack spacing={useBreakpointValue({ base: 4, md: 6 })} textAlign="center" width="100%" maxWidth="1200px">
                        {/* Title of the page */}
                        <Heading as="h1" size={useBreakpointValue({ base: "2xl", md: "4xl" })} mb={2}>
                            Catch My Train
                        </Heading>

                        {/* Side-by-side text boxes describing the App */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={useBreakpointValue({ base: 4, md: 8 })} width="100%">
                            <Box p={4} borderRadius="md" backgroundColor="blue.600" color="white" boxShadow="md">
                                <Text fontSize={useBreakpointValue({ base: "sm", md: "md" })}>
                                    Are you looking to meet up with friends who live far away, but struggling to find the perfect meeting spot or the optimal time? Coordinating schedules and locations can be a hassle, but <strong>Catch My Train</strong> is here to simplify the process!
                                </Text>
                            </Box>
                            <Box p={4} borderRadius="md" backgroundColor="green.600" color="white" boxShadow="md">
                                <Text fontSize={useBreakpointValue({ base: "sm", md: "md" })}>
                                    With <strong>Catch My Train</strong>, you simply input your friends' starting locations and their preferred departure or arrival times. Our app will take care of the rest, helping you find the ideal meeting point and timing for everyone involved.
                                </Text>
                            </Box>
                        </SimpleGrid>

                        {/* Redirect button to start Planning journey */}
                        <Button
                            colorScheme="teal"
                            size={useBreakpointValue({ base: "md", md: "lg" })}
                            fontSize={useBreakpointValue({ base: "lg", md: "2xl" })}
                            boxShadow="lg"
                            mt={useBreakpointValue({ base: 8, md: 12 })}
                            onClick={() => { window.location.href = '/planner'; }}
                        >
                            Start Planning Your Journey
                        </Button>

                        {/* Some text below the start button */}
                        <Text
                            fontSize={useBreakpointValue({ base: "sm", md: "xl" })}
                            mt={useBreakpointValue({ base: 4, md: 8 })}
                            textShadow="1px 1px 2px rgba(0, 0, 0, 0.7)"
                        >
                            Let the magic of seamless coordination make your next get-together a breeze!
                        </Text>
                    </VStack>
                </Box>
            </Box>
        </div>
    );
};

export default HomePage;
