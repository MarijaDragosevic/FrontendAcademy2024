import React from 'react';
import { Box, Text, Image,Link } from '@kuma-ui/core';
import useSWR from 'swr';
import { IconArrowRight } from "./ComponentsSVG";

interface EventItemProps {
    eventId: string;
    sport: string; 
    // Add other props if necessary
}

const EventItem: React.FC<EventItemProps> = ({ eventId,sport }) => {

    const { data, error } = useSWR(`/api/event/${eventId}`);
 
    console.log(sport)

    // Check if data is still loading
    if (!data && !error) {
        return <Text>Loading...</Text>;
    }

    // Check for errors
    if (error) {
        return <Text>Error loading event details.</Text>;
    }

    // Check if data is undefined
    if (!data) {
        return <Text>No data available.</Text>;
    }

    const mapStatus = (status: string) => {
        switch (status) {
            case 'notstarted':
                return '-';
            case 'inprogress':

                return `36`;
            case 'finished':
                return 'FT';
            default:
                return status;
        }
    };

    return (
        <>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minWidth: 0 }}>
    {/* Close button (x) */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text fontSize="24px" fontWeight="bold" cursor="pointer" marginLeft="10px" >x</Text>
        
    </div>
    <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 0 }}>
    {/* View Full Page link */}
    <Link href={`/sport/${sport}/event/${eventId}`} fontSize="fontSizes.md" marginRight="10px" fontWeight="bold" color="#374df5;">View Full Page</Link><IconArrowRight/></div>
</div>


        <Box p={30} width="100%" display="flex" alignItems="center" justifyContent="space-between">
           
            {/* First Column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                {/* Home Team */}
                <Image src={`/api/team/${data.homeTeam.id}/image`} w="40px" h="40px" />
                {/* Home Team Name */}
                <Text fontSize="fontSizes.md" fontWeight="bold" marginLeft="10px">{data.homeTeam.name}</Text>
            </div>
            {/* Second Column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth: 0, marginLeft: "20px", paddingLeft: "0px" }}>
                    {/* Home Score */}
                    <Text fontSize="32px" marginLeft="10px" fontFamily="Roboto" fontWeight="bold" color="red">{data.homeScore.total}</Text>
                    <Text fontSize="32px" marginLeft="10px" fontFamily="Roboto" fontWeight="bold" color="red">-</Text>
                    <Text fontSize="32px" marginLeft="10px" fontFamily="Roboto" fontWeight="bold" color="red">{data.awayScore.total}</Text>
                </div>
                <Text fontSize="fontSizes.md" mt={10} ml={30}>{mapStatus(data.status)}</Text>
            </div>
            {/* Third Column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                {/* Away Team */}
                <Image src={`/api/team/${data.awayTeam.id}/image`} w="40px" h="40px" />
                {/* Away Team Name */}
                <Text fontSize="fontSizes.md" fontWeight="bold" marginLeft="10px" >{data.awayTeam.name}</Text>
            </div>
        </Box></>
    );
};

export default EventItem;