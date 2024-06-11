import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sport page
    router.replace('/sport/football/');
  }, [router]);

  return null;
};

export default HomePage;
