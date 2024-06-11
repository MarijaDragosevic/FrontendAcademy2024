import {Box,Flex,Text,Image, VStack, Spacer} from '@kuma-ui/core'
import { SofascoreLockup,IconSettings} from "./ComponentsSVG"
import {Navigation} from "./Navigation"

const Header=()=>{
    return(
        <VStack justify="center" alignItems="center" bg="colors.primary">
            
            <Flex justify="space-between" alignItems="center" p={22} bg="colors.primary" color="white" w="100%">
                {/* Left section (SofascoreLockup) */}
                <Flex flex="1" justifyContent="center" >
                    <SofascoreLockup />
                </Flex>
                
                {/* Right section (IconSettings) */}
                <Flex justify="flex-end" alignItems="center" >
                    
                    <IconSettings />
                </Flex>
            </Flex>
            <Navigation />
            
        </VStack>
    )
}

export default Header;