import { Box, Flex, Text, Image, VStack, Spacer } from '@kuma-ui/core'
import useSWR from 'swr'

interface LeaguesProps {
    sport: string
    style?: React.CSSProperties;
  }


export const Leagues: React.FC<LeaguesProps> = ({ sport }) => {


    const { data: tournamentsData, error: tournamentsError } = useSWR(`/api/sport/${sport}/tournaments`)

   console.log(tournamentsData)

   if (tournamentsError) {
    return <Text fontSize="fontSizes.sm">Error loading tournaments...</Text>
  }

  if (!tournamentsData) {
    return <Text fontSize="fontSizes.sm">Loading tournaments...</Text>
  }

    return (
        <VStack
      justify="flex-start"
      alignItems="flex-start"
      bg="white"
      p={20}
      borderRadius={16}
      w="100%"
      h="668px"
      flexGrow={1}
    
    >
      <Text fontSize="fontSizes.md" fontWeight="bold" mb={10}>Leagues</Text>
      {tournamentsData.map((tournament: any) => (
        <Flex key={tournament.id} alignItems="center" mt={3}>
          <Box mr={2}>
            <Image src={`/api/tournament/${tournament.id}/image`} w="40px" h="40px" />
          </Box>
          <Text fontSize="fontSizes.sm">{tournament.name}</Text>
        </Flex>
      ))}
    </VStack>
    )
}