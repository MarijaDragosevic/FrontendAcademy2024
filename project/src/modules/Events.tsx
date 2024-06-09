import React, { useState } from 'react';
import { Box, VStack, Text, Image } from '@kuma-ui/core';
import useSWR from 'swr';
import { DatePicker } from './DatePicker';
import { IconArrowRight } from "./ComponentsSVG";
import EventItem from './EventItem'; // Import EventItem component

interface EventsProps {
    sport: string;
    eventData: any[]; // Add prop for event data
    style?: React.CSSProperties;
}

export const Events: React.FC<EventsProps> = ({ sport, eventData }) => {
    const { data: tournamentsData, error: tournamentsError } = useSWR(`/api/sport/${sport}/tournaments`);
    const [selectedRow, setSelectedRow] = useState<number | null>(null); // State to track selected row index
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null); // State to track selected event id
    console.log(sport)

    if (tournamentsError) {
        return <Text fontSize="sm">Error loading tournaments...</Text>;
    }

    if (!tournamentsData) {
        return <Text fontSize="sm">Loading tournaments...</Text>;
    }

    const extractTime = (isoDateString: string) => {
        const date = new Date(isoDateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const mapStatus = (status: string, startDate: string) => {
        switch (status) {
            case 'notstarted':
                return '-';
            case 'inprogress':
                const currentTime = new Date();
                const startTime = new Date(startDate);
                const timeDifference = Math.floor((currentTime.getTime() - startTime.getTime()) / (1000 * 60));
                return `In Progress (${timeDifference} mins)`;
            case 'finished':
                return 'FT';
            default:
                return status;
        }
    };

    let previousTournamentId: string | null = null; // Keep track of previous tournament id

    return (
        <Box display="flex" w="1240px">
            {/* First container */}
            <Box flex="1">
                {/* Your existing code here */}
                <DatePicker style={{ width: '100%', position: 'absolute', top: 0, zIndex: 999 }} />
                <VStack
                    justify="flex-start"
                    alignItems="flex-start"
                    bg="white"
                    style={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', marginRight: '10px' }}
                    w="100%"
                    h="618px"
                    overflow="auto"
                    flexGrow={1}
                    position="relative"
                >
                    {/* Today row */}
                    <Box p={0} width="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Text fontSize="fontSizes.md" fontWeight="bold" pl={20}>Today</Text>
                        <Text fontSize="fontSizes.md" p={20}>{eventData ? eventData.length : 0} events</Text>
                    </Box>
                    {/* Render event details or message */}
                    {eventData && eventData.length > 0 ? (
                        eventData.map((event: any, index: number) => {
                            const tournamentId = event.tournament.id;
                            const displayTournament = tournamentId !== previousTournamentId;
                            previousTournamentId = tournamentId;
                            return (
                                <React.Fragment key={event.id}>
                                    {displayTournament && (
                                        <Box key={index} p={4} borderBottom="1px solid #ccc" width="100%" display="flex" alignItems="center" pl={20}>
                                            <Image src={`/api/tournament/${event.tournament.id}/image`} w="40px" h="40px" />
                                            <Text fontSize="fontSizes.md" fontWeight="bold" marginLeft="10px" marginRight="10px">{event.tournament.country.name}</Text>
                                            <IconArrowRight />
                                            <Text fontSize="fontSizes.sm" marginLeft="10px">{event.tournament.name}</Text>
                                        </Box>
                                    )}
                                 
                                    {/* Second row for event details */}
                                    <Box p={0} width="100%" display="flex" alignItems="center" backgroundColor={selectedRow === index ? '#e1edfe' : 'transparent'} // Change background color based on selected row
                                         onClick={() => { setSelectedRow(index); setSelectedEventId(event.id); }}> 
                                        {/* First Column */}
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                                            {/* Time */}
                                            <Text fontSize="fontSizes.md">{extractTime(event.startDate)}</Text>
                                            {/* Status */}
                                            <Text fontSize="fontSizes.md" mt={10}>{mapStatus(event.status, event.startDate)}</Text>
                                        </div>

                                        {/* Line Separator */}
                                        <div style={{ borderLeft: '1px solid #ccc', height: '100px' }}></div>

                                        {/* Second Column */}
                                        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}>
                                            {/* Home Team */}
                                            <div style={{ flex: 2, display: 'flex', alignItems: 'center', minWidth: 0 ,  marginLeft: '10px' }}>
                                                {/* Team Image */}
                                                <Image src={`/api/team/${event.homeTeam.id}/image`} w="24px" h="24x" />

                                                {/* Team Name */}
                                                <Text fontSize="fontSizes.md" marginLeft="10px">{event.homeTeam.name}</Text>
                                            </div>

                                            {/* Away Team */}
                                            <div style={{ flex: 2, display: 'flex', alignItems: 'center', minWidth: 0 , marginTop: '10px',  marginLeft: '10px' }}>
                                                {/* Team Image */}
                                                <Image src={`/api/team/${event.awayTeam.id}/image`} w="24px" h="24px" />

                                                {/* Team Name */}
                                                <Text fontSize="fontSizes.md"marginLeft="10px">{event.awayTeam.name}</Text>
</div>
</div>
                                    {/* Third Column */}
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 0, marginTop: '10px', marginRight: '20px'}}>
                                        {/* Home Score */}
                                        <Text fontSize="fontSizes.md">{event.homeScore.total}</Text>
                                        {/* Away Score */}
                                        <Text fontSize="fontSizes.md" mt={10}>{event.awayScore.total}</Text>
                                    </div>
                                </Box>
                            </React.Fragment>
                        );
                    })
                ) : (
                    <Text fontSize="sm">No matches for this day.</Text>
                )}
            </VStack>
        </Box>
        {/* Second container */}
        <Box w="160px" h="150px" bg={selectedEventId ? "white" : "#eff3f8"}  flex="1" style={{ borderRadius: '16px', marginLeft: '10px' }}>
            {selectedEventId && <EventItem eventId={selectedEventId} sport={sport} />}
        </Box>
    </Box>
);
}