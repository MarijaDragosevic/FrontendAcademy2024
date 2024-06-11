import { Box, Flex, Text } from '@kuma-ui/core';
import { useEffect, useState } from 'react';
import { IconArrowLeft, IconArrowRight } from "./ComponentsSVG";
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DatePickerProps {
  style?: React.CSSProperties;

  
}

export const DatePicker: React.FC<DatePickerProps> = ({ style}) => {

 const router = useRouter();
    const { sport } = router.query;


  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [pickedDate, setPickedDate] = useState<Date | null>(null);

  const getDates = (date: Date): Date[] => {
    const dates: Date[] = [];
    const today = new Date(date);
    today.setDate(today.getDate() - 3);
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(today));
      today.setDate(today.getDate() + 1);
    }
    return dates;
  }

  useEffect(() => {
    setCurrentDate(new Date());
    setPickedDate(new Date()); // Set picked date to today's date
  }, []);

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  const handleDateClick = (date: Date) => {
    setPickedDate(date);
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  }

  const prevWeek = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 7);
    setCurrentDate(prevDate);
  }

  const nextWeek = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 7);
    setCurrentDate(nextDate);
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{
        ...style,
        overflowX: 'auto',
        backgroundColor: '#374df5',
        borderRadius: '16px 16px 0px 0px',
        position: 'relative',
      }}
    >
      {/* Button for previous week */}
      <Flex
        style={{ position: 'absolute', left: '0', zIndex: '1' }}
        alignItems="center"
        justifyContent="center"
      >
        <button
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'white',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            borderRadius: '2px',
            margin: '0 10px ',
          }}
          onClick={prevWeek}
        >
          <IconArrowLeft />
        </button>
      </Flex>

      {/* Dates */}
      {getDates(currentDate).map((date, index) => (
        <Link key={index} href={`/sport/${sport}/${formatDate(date)}`}>
          <Box
            textAlign="center"
            marginX="10px"
            padding="8px"
            backgroundColor={pickedDate && pickedDate.getDate() === date.getDate() ? 'transparent' : 'colors.primary'}
            cursor="pointer"
            onClick={() => handleDateClick(date)}
            color="white"
            borderBottom={pickedDate && pickedDate.getDate() === date.getDate() ? '2px solid white' : "2px solid transparent"}
          >
            <Text fontSize="fontSizes.sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
            <Text fontSize="fontSizes.sm">
              {`${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`}
            </Text>
          </Box>
        </Link>
      ))}

      {/* Button for next week */}
      <Flex
        style={{ position: 'absolute', right: '0', zIndex: '1' }}
        alignItems="center"
        justifyContent="center"
      >
        <button
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'white',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            borderRadius: '2px',
            margin: '0 10px ',
          }}
          onClick={nextWeek}
        >
          <IconArrowRight />
        </button>
      </Flex>
    </Flex>
  );
};
