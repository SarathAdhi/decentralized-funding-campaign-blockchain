import { LoadingPage } from "@components/LoadingPage";
import { PageLayout } from "@layouts/PageLayout";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from "@utils/constants";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";
import { Campaign } from "types/campaigns";
import { ViewCampaign } from "@modules/ViewCampaign";

type ReadContractProps = {
  data: Campaign | undefined;
  isLoading: boolean;
  refetch: () => void;
};

const ViewCampaignPage = () => {
  const { query } = useRouter();
  const _id = query.id && `${query.id}`.split("-");
  const id = _id && _id[_id.length - 1];

  const { contract } = useContract(contractAddress);
  const { data, isLoading, refetch }: ReadContractProps = useContractRead(
    contract,
    "getCampaign",
    [id]
  );

  if (isLoading) return <LoadingPage />;
  if (!id || !data) return <></>;

  if (!data.title) return <Error statusCode={404} title="Campaign not found" />;

  return (
    <PageLayout title="" className="flex flex-col items-start gap-4">
      <ViewCampaign
        campaign={data}
        {...{ isLoading, contract, refetch, id, fullUrl: `${query.id}` }}
      />
    </PageLayout>
  );
};

export default ViewCampaignPage;
