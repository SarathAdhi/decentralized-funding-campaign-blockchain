import { Heading } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import { Campaign } from "types/campaigns";
import { EditControls } from "./components/EditControls";
import { SmartContract } from "@thirdweb-dev/sdk";
import { TopSection } from "./components/Card/TopSection";
import { BottomSection } from "./components/Card/BottomSection";

type Props = {
  id: string;
  fullUrl: string;
  campaign: Campaign;
  isLoading: boolean;
  refetch: () => void;
  contract: SmartContract | undefined;
};

export const ViewCampaign: React.FC<Props> = ({
  campaign,
  refetch,
  id,
  fullUrl,
  contract,
}) => {
  const address = useAddress();

  const { owner, title, donations: _donations, isCancelled } = campaign;

  const donations = _donations.map((e) =>
    parseFloat(ethers.utils.formatEther(e.toString()))
  );

  const isMyCampaign = owner.toLowerCase() === address?.toLowerCase();

  return (
    <div title="" className="flex flex-col items-start gap-4">
      <Heading color="gray.300">{title}</Heading>

      {isMyCampaign && !isCancelled && (
        <EditControls {...{ id, fullUrl, contract }} />
      )}

      <TopSection {...{ ...campaign, _donations: donations }} />

      <BottomSection
        {...{ ...campaign, contract, refetch, _donations: donations }}
      />
    </div>
  );
};
