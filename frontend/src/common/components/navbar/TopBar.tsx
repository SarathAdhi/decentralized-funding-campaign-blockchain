import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Slide,
} from "@chakra-ui/react";
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import React, { useRef, useState } from "react";
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt";
import Link from "next/link";
import { MenuOpen } from "@styled-icons/material-rounded/MenuOpen";
import { useOutsideClick } from "@chakra-ui/react";
import { NavLinks } from "./NavLinks";
import { useRouter } from "next/router";

export const Topbar = () => {
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();
  const router = useRouter();

  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useOutsideClick({
    ref: ref,
    handler: () => setIsModalOpen(false),
  });

  function searchCampaign() {
    router.replace(`/campaign?q=${searchQuery}`);
  }

  return (
    <header className="px-2 md:px-5 w-full h-16 flex items-center justify-center">
      <div className="w-full flex-1 max-w-[1280px] flex items-center justify-between gap-2">
        <Link href="/" className="block md:hidden">
          <img src="/assets/logo.svg" className="w-10 h-10" />
        </Link>

        <InputGroup
          w="auto"
          className="!w-80 duration-200 focus-within:!w-96 !hidden md:!block"
        >
          <Input
            placeholder="Search for Campaigns"
            className="w-full text-white !border-0 !rounded-full !bg-gray-800"
            onChange={({ target }) => setSearchQuery(target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchCampaign();
            }}
          />

          <InputRightElement className="!w-14">
            <Button
              size="sm"
              className="!rounded-full !bg-blue-500"
              onClick={searchCampaign}
            >
              <SearchAlt color="gray.300" className="w-6 h-6 text-black" />
            </Button>
          </InputRightElement>
        </InputGroup>

        <div className="hidden md:block">
          <Button
            color="white"
            bgColor="orange.600"
            _hover={{ bgColor: "orange.500" }}
            _active={{ bgColor: "orange.400" }}
            onClick={() => {
              if (!address) connect();
              else disconnect();
            }}
          >
            {!address ? "Connect Wallet" : "Disconnect Wallet"}
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsModalOpen(true)}>
          <MenuOpen className="w-10 h-10 text-white" />
        </button>

        <Slide
          className="md:!hidden"
          direction="top"
          in={isModalOpen}
          style={{ zIndex: 10 }}
          ref={ref}
        >
          <Box
            m="2"
            rounded="md"
            shadow="md"
            className="p-4 grid gap-2 bg-gray-900"
          >
            <div className="w-full flex items-stretch gap-1">
              <Input
                placeholder="Search for Campaigns"
                className="!text-sm !border-0 !rounded-full !bg-gray-800"
                onChange={({ target }) => setSearchQuery(target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchCampaign();
                }}
              />

              <Button
                p={0}
                className="!rounded-full !bg-blue-500"
                onClick={searchCampaign}
              >
                <SearchAlt color="gray.300" className="w-5 h-5 text-black" />
              </Button>
            </div>

            <div className="w-full grid place-items-start gap-2">
              <NavLinks
                iconClassName="w-6 h-6"
                activeClassName="text-blue-500"
                showName
              />

              <div className="mt-2">
                <Button
                  onClick={() => {
                    if (!address) connect();
                    else disconnect();
                  }}
                >
                  {!address ? "Connect Wallet" : "Disconnect Wallet"}
                </Button>
              </div>
            </div>
          </Box>
        </Slide>
      </div>
    </header>
  );
};
