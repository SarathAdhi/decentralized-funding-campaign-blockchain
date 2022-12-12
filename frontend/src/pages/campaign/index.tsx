import { PageLayout } from "@layouts/PageLayout";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from "@utils/constants";
import { RenderCampaigns } from "@components/RenderCampaigns";
import { useRouter } from "next/router";
import { Campaign } from "types/campaigns";

const ViewCampaignsPage = () => {
  const { query } = useRouter();
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getCampaigns");

  const q = (query.q as string)?.toLowerCase();

  const filteredCampaigns =
    q && data
      ? data.filter((e: Campaign) => e.title.toLowerCase().includes(q))
      : data;

  return (
    <PageLayout title="" className="flex flex-col items-end">
      <RenderCampaigns
        campaigns={filteredCampaigns || []}
        isLoading={isLoading}
      />
    </PageLayout>
  );
};

export default ViewCampaignsPage;
