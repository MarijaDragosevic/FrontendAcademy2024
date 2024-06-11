import { useThemeContext } from '@/context/ThemeContext';
import { Box, Button } from '@kuma-ui/core';
import Head from 'next/head';
import Header from '../../modules/Header';
import Footer from '../../modules/Footer';
import { Leagues } from '../../modules/Leagues';
import { Events } from '../../modules/Events';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
    const { setIsDark } = useThemeContext();
    const router = useRouter();
    
    // Function to format date as yyyy-mm-dd
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    // Get today's date
    const today = new Date();
    
    useEffect(() => {
        // Redirect to sport page
        router.replace(`/sport/football/${formatDate(today)}`);
      }, []);
  
      return null; 
  }
