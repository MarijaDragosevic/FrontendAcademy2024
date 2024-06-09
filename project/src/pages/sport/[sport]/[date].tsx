import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useThemeContext } from '@/context/ThemeContext';
import { Box, Button, Text } from '@kuma-ui/core';
import Head from 'next/head';

import  Header  from '../../../modules/Header';
import Footer  from '../../../modules/Footer';
import { Leagues } from '../../../modules/Leagues';
import { Events } from '../../../modules/Events';

const SportDatePage = () => {
  const router = useRouter();
  const { sport, date } = router.query;

  const { data, error } = useSWR(`/api/sport/${sport}/events/${date}`);


  const { setIsDark } = useThemeContext();
  const sportString = Array.isArray(sport) ? sport[0] : sport || 'defaultSport'

  

  return (
    <>
      <Head>
        <title>Sport Date Page</title>
        <meta name="description" content="Sport Date Page" />
      </Head>
      <Header />

      <div style={{ display: 'flex', flexDirection: 'row', padding: '24px 30px', marginTop: '24px' }}>
        <div style={{ marginRight: '30px', flex: '1', width:"100px"}}>
          <Leagues sport={sportString } />
        </div>
        <div style={{ marginRight: '30px', flex: '1' }}>
          <Events sport={sportString} eventData={data} />
        </div>
        
      </div>


      <Footer />
    </>
  );
};

export default SportDatePage;
