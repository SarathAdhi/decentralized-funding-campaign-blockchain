import withAuth from "@hoc/withAuth";
import { PageLayout } from "@layouts/PageLayout";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from "@utils/constants";
import React from "react";
import { Campaign } from "types/campaigns";
import { RenderCampaigns } from "@components/RenderCampaigns";

type ReadContractProps = {
  data: Campaign[] | undefined;
  isLoading: boolean;
  refetch: () => void;
};

const Profile = () => {
  const address = useAddress();

  const { contract } = useContract(contractAddress);
  const { data, isLoading }: ReadContractProps = useContractRead(
    contract,
    "getCampaigns"
  );

  const campaigns = data?.filter(
    ({ owner }) => owner.toLowerCase() === address?.toLowerCase()
  );

  return (
    <PageLayout title="">
      <RenderCampaigns campaigns={campaigns || []} isLoading={isLoading} />
    </PageLayout>
  );
};

export default withAuth(Profile);
