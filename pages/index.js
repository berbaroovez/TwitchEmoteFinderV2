import React, { useRef, useState, useEffect } from "react";
import {
  Heading,
  InputGroup,
  Box,
  Input,
  InputRightElement,
  Button,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { getBTTV } from "../lib/bttv";

export default function Home() {
  const inputEl = useRef(null);
  const [loading, setLoading] = useState(false);
  const [twitchUserId, setTwitchUserId] = useState();
  const [bttvEmotesList, setBttvEmotesList] = useState();
  const toast = useToast();

  useEffect(async () => {
    if (twitchUserId) {
      console.log("UsernameID", twitchUserId);
      const res = await fetch("/api/bttv", {
        body: JSON.stringify({
          twitchUserId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error, bttvEmotes } = await res.json();

      setBttvEmotesList(bttvEmotes);
    }
  }, [twitchUserId]);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/username", {
      body: JSON.stringify({
        username: inputEl.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    setLoading(false);

    const { error, usernameId } = await res.json();

    if (error) {
      toast({
        title: "An error occurred.",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    if (usernameId) {
      setTwitchUserId(usernameId);
      toast({
        title: "Success!",
        description: twitchUserId,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
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
              _hover={{ bg: "black" }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>

      {bttvEmotesList ? (
        bttvEmotesList.map((emotes) => <p key={emotes.id}>{emotes.code}</p>)
      ) : (
        <p>Emotes Loading</p>
      )}
    </div>
  );
}

{
  /* <img src={"https://cdn.betterttv.net/emote/5e7ed568d6581c3724c16898/3x"}/> */
}
