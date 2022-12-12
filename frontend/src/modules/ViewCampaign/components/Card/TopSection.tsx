import { Badge, Heading, Progress, Text } from "@chakra-ui/react";
import { calculateBarPercentage, daysLeft, parseImage } from "@utils/parse";
import { ethers } from "ethers";
import React from "react";
import { Campaign } from "types/campaigns";

type Props = {
  _donations: number[];
} & Campaign;

export const TopSection: React.FC<Props> = ({
  image,
  collectedAmount,
  targetAmount,
  endDate,
  _donations,
  donators,
  isCompleted,
  isCancelled,
}) => {
  const collectedAmt = ethers.utils.formatEther(collectedAmount.toString());
  const targetAmt = ethers.utils.formatEther(targetAmount.toString());
  const days = daysLeft(endDate.toNumber());
  const maximunDonation = Math.max.apply(null, _donations);

  const infoChips = [
    { heading: days, text: "Days Left" },
    { heading: collectedAmt, text: `Raised of ${targetAmt}` },
    {
      heading: maximunDonation === Math.max() ? 0 : maximunDonation,
      text: "Highest Donation",
    },
    { heading: donators.length, text: "Total Donators" },
  ];

  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-6 gap-2">
      <div className="relative col-span-5">
        <img src={parseImage(image)} className="w-full h-full rounded-lg" />

        {(isCancelled || isCompleted) && (
          <div className="absolute top-0 left-0 w-full rounded-lg h-full bg-black/80" />
        )}

        <Badge
          fontSize={{ base: "xl", sm: "2xl" }}
          className="!absolute top-0 right-0"
          colorScheme={isCompleted ? "purple" : isCancelled ? "red" : "green"}
        >
          {isCompleted ? "Completed" : isCancelled ? "Cancelled" : "Active"}
        </Badge>
      </div>

      <div className="mt-3 md:mt-0 order-1 lg:order-none lg:ml-3 w-full flex flex-col md:flex-row lg:flex-col gap-2 justify-between">
        {infoChips.map(({ heading, text }, index) => (
          <div
            key={text + index}
            className="flex-1 p-4 bg-gray-800 grid gap-2 place-items-center rounded-lg"
          >
            <Heading color="white">{heading}</Heading>

            <Text textAlign="center" color="gray.400">
              {text}
            </Text>
          </div>
        ))}
      </div>

      <Progress
        className="!col-span-5 !bg-gray-800"
        colorScheme="blue"
        size="md"
        value={calculateBarPercentage(
          parseFloat(targetAmt),
          parseFloat(collectedAmt)
        )}
        borderRadius="xl"
      />
    </div>
  );
};
