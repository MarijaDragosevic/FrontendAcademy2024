import { useThemeContext } from '@/context/ThemeContext'
import { Box, Button } from '@kuma-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import useSWR from 'swr'
import Header from '../modules/Header'
import Footer from '../modules/Footer'

const MotionBox = motion(Box)

export default function Home() {
  const { setIsDark } = useThemeContext()
  const { data, error } = useSWR('/api/sports')

  console.log(data, error)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
    
      <Box as="main">
        <Box as="h1" color="colors.primary">
          This is your homepage Marija
        </Box>
        <Button onClick={() => setIsDark(v => !v)}>Toggle theme</Button>
      </Box>
      <AnimatePresence>
        <MotionBox              initial={{ opacity: '0', transitionDuration: '0.5s' }}
                                animate={{ opacity: '1' }}>
          This is animated
        </MotionBox>
      </AnimatePresence>
     
    </>
  )
}
