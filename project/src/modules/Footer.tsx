import { Box, Flex, Text, Image, VStack, Spacer } from '@kuma-ui/core'
import { SofascoreLockup, IconSettings } from "./ComponentsSVG"
import { Navigation } from "./Navigation"

 const Footer = () => {

    
    return (
        <VStack justify="center" alignItems="center" bg="colors.surface.s2" w="100%" p={20}   style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000, // Adjust as needed
          }} >

            <SofascoreLockup fillColor='black' />

            <Text color='colors.onSurface.nLv2' fontSize="fontSizes.xs" style={{ fontFamily: 'Roboto-Condensed, sans-serif' }} p={20}>© 2023 Sofascore – All Rights Reserved.</Text>

        </VStack>
    )
}
export default Footer;