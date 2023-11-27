import {
  Button,
  Collapse,
  Divider,
  ListItem,
  OrderedList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Card } from "@components/Card";
import { Input } from "@components/elements/Input";
import { SmartContract } from "@thirdweb-dev/sdk";
import { getDummyPicture } from "@utils/index";
import { parseError } from "@utils/parse";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Campaign } from "types/campaigns";
import { Share } from "@styled-icons/heroicons-solid/Share";

type Props = {
  _donations: number[];
  contract: SmartContract | undefined;
  refetch: () => void;
} & Campaign;

export const BottomSection: React.FC<Props> = ({
  id,
  ownerName,
  owner,
  description,
  donators,
  _donations: donations,
  isCancelled,
  isCompleted,
  contract,
  refetch,
}) => {
  const [amount, setAmount] = useState("");
  const [isDonationTransactionLoading, setIsDonationTransactionLoading] =
    useState(false);

  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  async function handleDonation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsDonationTransactionLoading(true);

    try {
      await contract?.call("donateToCampaign", [id], {
        value: ethers.utils.parseEther(amount),
      });

      setAmount("");

      refetch();

      toast({
        title: "Transaction successful",
        description: "Campaign donation successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Transaction failed",
        description: parseError(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsDonationTransactionLoading(false);
  }

  return (
    <div className="w-full mt-5 grid lg:grid-cols-2 gap-10">
      <div className="grid gap-6">
        <button
          className="mb-2 flex items-center gap-2 text-white"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Copied to clipboard",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          <Share className="w-6 h-6 text-sky-600" />
          <span>Share</span>
        </button>

        <Card label="Creator" className="flex gap-3">
          <img
            src={getDummyPicture(ownerName)}
            className="w-12 h-12 rounded-full"
          />

          <p className="grid text-white">
            <span className="text-lg font-bold truncate">{ownerName}</span>
            <span className="lg:-mt-1 text-sm font-medium text-gray-500 truncate">
              {owner}
            </span>
          </p>
        </Card>

        <Divider />

        <Card label="Description" className="flex">
          <Text mt={-2} color="white" whiteSpace="pre-wrap">
            {description}
          </Text>
        </Card>

        <Divider />

        <Card label="Donators">
          {donators.length > 0 && (
            <>
              <Collapse className="lg:-mt-2 " startingHeight={45} in={isOpen}>
                <OrderedList className="grid">
                  {donators.map((donator, index) => (
                    <ListItem key={donator + index} color="gray.400">
                      <div className="w-full grid lg:flex lg:flex-row justify-between">
                        <span className="w-full truncate">{donator}</span>
                        <span>{donations[index]}</span>
                      </div>
                    </ListItem>
                  ))}
                </OrderedList>
              </Collapse>

              {donators.length > 2 && (
                <Button size="sm" onClick={onToggle} mt="1rem">
                  Show {isOpen ? "Less" : "More"}
                </Button>
              )}
            </>
          )}
        </Card>
      </div>

      <Divider className="lg:hidden" />

      <Card label="Donate">
        <form onSubmit={handleDonation} className="grid gap-2">
          <Input
            type="number"
            name="amt"
            placeholder="0.01 ETH"
            value={amount}
            onChange={({ target }) => setAmount(target.value)}
            isDisabled={isCancelled || isCompleted}
          />

          <Button
            type="submit"
            isLoading={isDonationTransactionLoading}
            disabled={isCancelled || isCompleted}
          >
            Donate
          </Button>
        </form>
      </Card>
    </div>
  );
};
