import { Campaign } from "types/campaigns";
import { CampaignCard } from "@components/CampaignCard";
import { daysLeft, parseUrl } from "@utils/parse";
import { CampaignLoadingSkeleton } from "@components/CampaignLoadingSkeleton";
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { Component } from "types/page";
import { FilterMenuList } from "./FilterMenuList";

const GridTile: React.FC<Component> = ({ children }) => (
  <div className="mt-2 w-full grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {children}
  </div>
);

type Props = {
  campaigns: Campaign[];
  isLoading: boolean;
};

export const RenderCampaigns: React.FC<Props> = ({ campaigns, isLoading }) => {
  const [currentSelectedTab, setCurrentSelectedTab] = useState("All");

  const editedCampaigns = campaigns.map((e) =>
    daysLeft(e.endDate.toNumber()) <= 0 ? { ...e, isCompleted: true } : e
  );

  const _campaigns = [...editedCampaigns].reverse();

  const filteredCampaigns = _campaigns.filter((e) =>
    currentSelectedTab === "Active"
      ? !e.isCompleted && !e.isCancelled
      : currentSelectedTab === "Completed"
      ? e.isCompleted
      : currentSelectedTab === "Cancelled"
      ? e.isCancelled
      : e
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-2">
        <Heading
          fontSize={{ base: "2xl", sm: "3xl" }}
          m={0}
          mt={-1}
          p={0}
          color="gray.100"
          className="w-full md:w-auto"
        >
          {`All Campaigns (${filteredCampaigns.length})`}
        </Heading>

        <FilterMenuList
          currentSelectedTab={currentSelectedTab}
          setCurrentSelectedTab={setCurrentSelectedTab}
        />
      </div>

      <GridTile>
        {isLoading ? (
          <CampaignLoadingSkeleton />
        ) : filteredCampaigns.length !== 0 ? (
          filteredCampaigns.map((campaign: Campaign) => (
            <CampaignCard
              key={parseUrl(campaign.title, campaign.id.toNumber())}
              {...campaign}
            />
          ))
        ) : (
          <p className="text-white font-medium">Nothing to show here</p>
        )}
      </GridTile>
    </div>
  );
};
