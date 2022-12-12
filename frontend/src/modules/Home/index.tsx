import {
  Badge,
  Button,
  Heading,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import React from "react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { RecentCampaignsCarousel } from "./components/RecentCampaignsCarousel";

export const ViewHome = () => {
  return (
    <div className="text-gray-300 grid gap-10">
      <div className="grid lg:grid-cols-2 place-items-center bg-gray-800 rounded-lg">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-full">
          <Image
            fill
            src="/assets/funding-image.jpg"
            className="rounded-t-md lg:rounded-t-none lg:!rounded-l-md lg:object-cover"
            alt="Children group"
          />
        </div>

        <div className="h-full flex flex-col items-start justify-center gap-5 p-5">
          <Heading size={{ base: "lg", sm: "xl" }} color="gray.200">
            Need Funds to Pay For a Medical Emergency or Social Cause?
          </Heading>

          <div className="md:my-4 w-full flex justify-between gap-5">
            <Stat>
              <StatNumber color="blue.400">0%</StatNumber>
              <StatLabel color="gray.400">PLATFORM FEE</StatLabel>
            </Stat>

            <Stat>
              <StatNumber color="blue.400">100%</StatNumber>
              <StatLabel color="gray.400">SECURED PLATFORM</StatLabel>
            </Stat>
          </div>

          <Button
            as={Link}
            href="/campaign/create"
            color="gray.800"
            mx={{ base: "auto", sm: "0" }}
          >
            Start a Campaign for FREE
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 place-items-center bg-gray-800 rounded-lg">
        <div className="order-2 lg:order-none h-full flex flex-col items-start justify-center gap-5 p-5">
          <Heading size={{ base: "lg", sm: "xl" }} color="gray.200">
            Start a Campaign in three simple steps
          </Heading>

          <OrderedList mb="5" fontSize="lg" fontWeight="medium">
            <ListItem>
              It will take only <Badge colorScheme="purple">2 minutes</Badge>.
              Just tell us a few details about you and the ones you are raising
              funds for.
            </ListItem>

            <ListItem>
              All you need to do is share the fundraiser with your friends and
              family. In no time, support will start pouring in.
            </ListItem>

            <ListItem>
              The funds donated will be directly sent to your{" "}
              <Badge colorScheme="purple">Crypto Wallet</Badge>
            </ListItem>
          </OrderedList>

          <Button
            as={Link}
            href="/campaign/create"
            color="gray.800"
            mx={{ base: "auto", sm: "0" }}
          >
            Start a Campaign for FREE
          </Button>
        </div>

        <div className="relative w-full h-[300px] md:h-[400px] lg:h-full">
          <Image
            fill
            src="/assets/funding-money.jpg"
            className="rounded-t-md lg:rounded-t-none lg:!rounded-r-md lg:object-cover"
            alt="Children group"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 place-items-center bg-gray-800 rounded-lg">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-full">
          <Image
            fill
            src="/assets/children-group.jpg"
            className="rounded-t-md lg:rounded-t-none lg:!rounded-l-md lg:object-cover"
            alt="Children group"
          />
        </div>

        <div className="h-full flex flex-col items-start justify-center gap-5 p-5">
          <Heading size={{ base: "lg", sm: "xl" }} color="gray.200">
            {`With your support, countless children will receive health care and a
            happy life. Start donating today.`}
          </Heading>

          <div className="md:my-4 w-full flex justify-between gap-5">
            <Stat>
              <StatNumber color="blue.400">0%</StatNumber>
              <StatLabel color="gray.400">PLATFORM FEE</StatLabel>
            </Stat>

            <Stat>
              <StatNumber color="blue.400">100%</StatNumber>
              <StatLabel color="gray.400">SECURED PLATFORM</StatLabel>
            </Stat>
          </div>

          <Button
            as={Link}
            href="/campaign"
            color="gray.800"
            mx={{ base: "auto", sm: "0" }}
          >
            Start Donating
          </Button>
        </div>
      </div>

      <RecentCampaignsCarousel />
    </div>
  );
};
