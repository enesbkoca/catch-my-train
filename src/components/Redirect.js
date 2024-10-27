import { Spinner, Text, VStack, Center } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const RedirectComponent = ({ message }) => {
    return (
        <Center height="100vh" className="loading_spin">
            <VStack
                spacing={6}
                p={10}
                bg="teal.50"
                borderRadius="lg"
                boxShadow="xl"
                animation={`${pulse} 1.5s infinite`}
            >
                <Spinner size="xl" color="teal.500" thickness="4px" speed="0.65s" mb={4} />
                <Text fontSize="2xl" color="teal.600" fontWeight="bold">
                    Hang tight! 🚆
                </Text>
                <Text fontSize="lg" color="gray.500">
                    {message}

                </Text>
            </VStack>
        </Center>
    );
};
