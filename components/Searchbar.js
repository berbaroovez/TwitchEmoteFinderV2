
import React, { useRef, useState } from 'react';
import {
  Heading,
  InputGroup,
  Box,
  Input,
  InputRightElement,
  Button,
  Text,
  Link,
  useToast
} from '@chakra-ui/react';

export default function Searchbar(){

    const [loading, setLoading] = useState(false);
    const inputEl = useRef(null);
    const toast = useToast();

    const search = async(e)=>{
        e.preventDefault()
        setLoading(true)

        const res = await fetch('/api/username', {
          body: JSON.stringify({
            username: inputEl.current.value
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });
        setLoading(false)
        
        
        console.log("res", res)
      }

    return (
        <Box m={8} w="100%" mx="auto" as="form">
          <Heading as="h5" size="xs" mb={1} color="gray.900" fontWeight="medium">
            Enter in a username to find their emotes
          </Heading>
          <InputGroup size="lg" mt={2}>
            <Input
              aria-label="Twitch Username for look up"
              placeholder="Enter a Twitch Username"
              ref={inputEl}
              type="email"
              fontSize="md"
            />
            <InputRightElement width="8.5rem">
              <Button
                isLoading={loading}
                fontWeight="bold"
                h="2.5rem"
                mr={1}
                size="md"
               onClick={search}
                bg="gray.800"
                color="white"
                _hover={{ bg: 'black' }}
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      );
}