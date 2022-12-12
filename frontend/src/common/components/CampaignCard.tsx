import { Badge, Heading, Progress, Text } from "@chakra-ui/react";
import {
  calculateBarPercentage,
  daysLeft,
  parseImage,
  parseUrl,
} from "@utils/parse";
import { ethers } from "ethers";
import Link from "next/link";
import React from "react";
import { Campaign } from "types/campaigns";

type Props = {} & Campaign;

export const CampaignCard: React.FC<Props> = ({
  id,
  title,
  image,
  description,
  collectedAmount,
  targetAmount,
  isCompleted,
  isCancelled,
  endDate,
}) => {
  const collectedAmt = ethers.utils.formatEther(collectedAmount.toString());
  const targetAmt = ethers.utils.formatEther(targetAmount.toString());

  const days = daysLeft(endDate.toNumber());

  return (
    <Link
      href={`/campaign/` + parseUrl(title, id.toNumber())}
      className="rounded-xl bg-gray-800 text-white flex flex-col"
    >
      <div className="relative">
        <img
          src={parseImage(image)}
          alt={title}
          className="rounded-t-xl w-full h-[150px]"
        />

        {(isCancelled || isCompleted) && (
          <div className="absolute top-0 left-0 w-full rounded-t-xl h-full bg-black/80" />
        )}

        <Badge
          fontSize="md"
          className="!absolute top-0 right-0"
          colorScheme={isCompleted ? "purple" : isCancelled ? "red" : "green"}
        >
          {isCompleted ? "Completed" : isCancelled ? "Cancelled" : "Active"}
        </Badge>
      </div>

      <div className="h-full p-3 flex flex-col gap-2">
        <div className="flex-1 flex flex-col gap-2">
          <Heading fontSize="xl" color="white" noOfLines={2}>
            {title}
          </Heading>

          <Text color="gray.400" noOfLines={3} lineHeight="5">
            {description}
          </Text>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <p className="text-2xl font-medium">{collectedAmt}</p>

            <span className="text-xs text-gray-400">{`Raised of ${targetAmt}`}</span>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-xl font-medium">{days}</p>

            <span className="text-xs text-gray-400">Days Left</span>
          </div>
        </div>

        <Progress
          className="!bg-[#101318]"
          colorScheme="blue"
          size="sm"
          value={calculateBarPercentage(
            parseFloat(targetAmt),
            parseFloat(collectedAmt)
          )}
          borderRadius="xl"
        />
      </div>
    </Link>
  );
};
