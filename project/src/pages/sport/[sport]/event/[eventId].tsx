import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useThemeContext } from '@/context/ThemeContext';
import { Box, Button, Text } from '@kuma-ui/core';
import Head from 'next/head';

import  EventItem from '../../../../modules/EventItem';
import  Header from '../../../../modules/Header';
import  Footer from '../../../../modules/Footer';

const SportDatePage = () => {
  const router = useRouter();
  const { sport, eventId } = router.query;

  // Handle eventId as an array of strings
  const eventIdString = Array.isArray(eventId) ? eventId[0] : eventId || '';

  // Fetch data based on sport and eventIdString
  const { data, error } = useSWR(`/api/sport/${sport}/event/${eventIdString}`);

  const { setIsDark } = useThemeContext();
  const sportString = Array.isArray(sport) ? sport[0] : sport || 'defaultSport';
  
  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Box w="160px" h="150px" bg="white" flex="1" style={{ borderRadius: '16px', marginLeft: '10px', marginTop: '10px'}}>
          {eventIdString && <EventItem eventId={eventIdString} sport={sportString} />}
          <Footer />
        </Box>
      </div>
    </>
  );
};

export default SportDatePage;
