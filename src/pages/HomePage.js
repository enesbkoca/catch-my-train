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
                    backgroundColor="rgba(0, 0, 0, 0.4)" // Semi-transparent overlay for the background
                    color="white"
                    padding="20px"
                    zIndex={2000}
                >
                    <VStack spacing={6} textAlign="center">
                        <Heading as="h1" size={useBreakpointValue({ base: "xl", md: "3xl" })} mb="4">
                            Catch My Train
                        </Heading>
                        <Text fontSize={useBreakpointValue({ base: "md", md: "lg" })} mb="6">
                            Helping people catch their trains one journey at a time! 🚄
                        </Text>
                        <Button
                            colorScheme="teal"
                            size="lg"
                            variant="solid"
                            boxShadow="lg"
                            onClick={() => { window.location.href = '/planner'; }}
                        >
                            Start Planning Your Journey
                        </Button>
                    </VStack>

                    {/* Text Boxes Side by Side */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={8} width="100%">
                        <Box p={4} borderRadius="md" backgroundColor="blue.600" color="white" boxShadow="md">
                            <Text fontSize="sm">
                                Are you looking to meet up with friends who live far away, but struggling to find the perfect meeting spot or the optimal time? Coordinating schedules and locations can be a hassle, but <strong>Catch the Train</strong> is here to simplify the process!
                            </Text>
                        </Box>
                        <Box p={4} borderRadius="md" backgroundColor="green.600" color="white" boxShadow="md">
                            <Text fontSize="sm">
                                With <strong>Catch the Train</strong>, you simply input your friends' starting locations and their preferred departure or arrival times. Our app will take care of the rest, helping you find the ideal meeting point and timing for everyone involved.
                            </Text>
                        </Box>
                        <Box p={4} borderRadius="md" backgroundColor="purple.600" color="white" boxShadow="md">
                            <Text fontSize="sm">
                                Let the magic of seamless coordination make your next get-together a breeze!
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>
        </div>
    );
};

export default HomePage;
