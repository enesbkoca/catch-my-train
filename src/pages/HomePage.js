import React from 'react';
import { Box, VStack, Heading, Text, Button, useBreakpointValue, SimpleGrid } from '@chakra-ui/react'; // Import necessary components
import MapComponent from "../components/MapComponent";
import { MapProvider } from "../components/MapContext";

const HomePage = () => {
    return (
        <div>
            <Box position="relative" height="100vh">
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
                    padding="20px"
                    zIndex={2000}
                >
                    <VStack spacing={6} textAlign="center">

                        {/* Title of the page */}
                        <Heading as="h1" size={useBreakpointValue({ base: "xl", md: "4xl" })} mb="2">
                            Catch My Train
                        </Heading>

                        {/* Side-by-side text boxes describing the App */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={2} width="100%">
                            <Box p={4} borderRadius="md" backgroundColor="blue.600" color="white" boxShadow="md">
                                <Text fontSize="md">
                                    Are you looking to meet up with friends who live far away, but struggling to find the perfect meeting spot or the optimal time? Coordinating schedules and locations can be a hassle, but <strong>Catch my Train</strong> is here to simplify the process!
                                </Text>
                            </Box>
                            <Box p={4} borderRadius="md" backgroundColor="green.600" color="white" boxShadow="md">
                                <Text fontSize="md">
                                    With <strong>Catch my Train</strong>, you simply input your friends' starting locations and their preferred departure or arrival times. Our app will take care of the rest, helping you find the ideal meeting point and timing for everyone involved.
                                </Text>
                            </Box>
                        </SimpleGrid>

                        {/* Redirect button to start Planning journey */}
                        <Button
                            colorScheme="teal"
                            size="lg"
                            variant="solid"
                            boxShadow="lg"
                            fontSize="3xl"
                            mt={350}
                            mb={0}
                            onClick={() => { window.location.href = '/planner'; }}
                        >
                            Start Planning Your Journey
                        </Button>

                        {/* Some text below the start button */}
                        <Text
                            fontSize={useBreakpointValue({ base: "md", md: "xl" })}
                            mb="6"
                            mt={0}
                            textShadow="1px 1px 2px rgba(0, 0, 0, 0.7)" // Adds a subtle shadow to the text
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
