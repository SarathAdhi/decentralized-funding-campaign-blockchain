import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { Edit } from "@styled-icons/boxicons-solid/Edit";
import { Cancel } from "@styled-icons/material/Cancel";
import { useContractWrite } from "@thirdweb-dev/react";
import { parseError } from "@utils/parse";
import { SmartContract } from "@thirdweb-dev/sdk";

type Props = {
  id: string;
  fullUrl: string;
  contract: SmartContract | undefined;
};

export const EditControls: React.FC<Props> = ({ id, fullUrl, contract }) => {
  const { mutateAsync: _cancelCampaign, isLoading: cancelCampaignIsLoading } =
    useContractWrite(contract, "cancelCampaign");

  const toast = useToast();

  async function cancelCampaign() {
    try {
      await _cancelCampaign([id]);

      toast({
        title: "Transaction success",
        description: "Cancelled the campaign.",
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
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        as={Link}
        px={2}
        leftIcon={<Edit className="text-black w-6 h-6" />}
        href={`/campaign/edit/${fullUrl}`}
      >
        Edit
      </Button>

      <Button
        bgColor="red"
        color="white"
        _hover={{ bgColor: "red.600" }}
        _active={{ bgColor: "" }}
        type="reset"
        px={2}
        leftIcon={<Cancel className="text-white w-6 h-6" />}
        isLoading={cancelCampaignIsLoading}
        onClick={cancelCampaign}
      >
        Cancel Campaign
      </Button>
    </div>
  );
};
