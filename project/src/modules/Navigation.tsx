import { Box, Flex, Text } from '@kuma-ui/core';
import { useState } from 'react';
import { IconAmericanFootball, IconBasketball, IconFootball } from './ComponentsSVG';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navigation = () => {
    const router = useRouter();
    const [selectedSport, setSelectedSport] = useState<null | string>(null);

    // Function to format date as yyyy-mm-dd
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Get today's date
    const today = new Date();
    const todayFormatted = formatDate(today);

    // Function to handle navigation to sport with today's date
    const navigateToSportWithDate = (sport: string) => {
        router.push(`/sport/${sport}/${todayFormatted}`);
    };

    return (
        <Flex justify="center" alignItems="center" bg="colors.primary" color="white" w="100%">
            {/* Football */}
            <Flex
                alignItems="center"
                p={8}
                borderBottom={selectedSport === 'Football' ? '2px solid white ' : '2px solid transparent'}
                onClick={() => {
                    setSelectedSport('Football');
                    navigateToSportWithDate('football');
                }}
                cursor="pointer"
            >
                <Box mr={2}><IconFootball /></Box>
                <Text fontSize="fontSizes.sm">Football</Text>
            </Flex>
            {/* Basketball */}
            <Flex
                mr={4}
                alignItems="center"
                p={8}
                borderBottom={selectedSport === 'Basketball' ? '2px solid white ' : '2px solid transparent'}
                onClick={() => {
                    setSelectedSport('Basketball');
                    navigateToSportWithDate('basketball');
                }}
                cursor="pointer"
            >
                <Box mr={2}><IconBasketball /></Box>
                <Text fontSize="fontSizes.sm">Basketball</Text>
            </Flex>
            {/* American Football */}
            <Flex
                alignItems="center"
                p={8}
                borderBottom={selectedSport === 'American Football' ? '2px solid white' : '2px solid transparent'}
                onClick={() => {
                    setSelectedSport('American Football');
                    navigateToSportWithDate('american-football');
                }}
                cursor="pointer"
            >
                <Box mr={2}><IconAmericanFootball /></Box>
                <Text fontSize="fontSizes.sm">American Football</Text>
            </Flex>
        </Flex>
    );
};
