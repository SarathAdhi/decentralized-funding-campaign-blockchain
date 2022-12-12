import { BigNumber } from "ethers";

export type Campaign = {
  id: BigNumber;
  ownerName: string;
  owner: string;
  title: string;
  description: string;
  image: string;
  targetAmount: BigNumber;
  collectedAmount: BigNumber;
  endDate: BigNumber;
  isCompleted: boolean;
  isCancelled: boolean;
  donators: string[];
  donations: BigNumber[];
};
