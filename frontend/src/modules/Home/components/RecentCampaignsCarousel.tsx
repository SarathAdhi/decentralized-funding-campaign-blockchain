import { CampaignCard } from "@components/CampaignCard";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from "@utils/constants";
import React from "react";
import Carousel from "framer-motion-carousel";
import { Heading } from "@chakra-ui/react";

export const RecentCampaignsCarousel = () => {
  const { contract } = useContract(contractAddress);

  const { data } = useContractRead(contract, "getCampaigns");

  if (!data) return <></>;

  const _campaigns = [...data].reverse();
  const filteredCampaigns = _campaigns.filter(
    ({ isCompleted, isCancelled }, index) =>
      !isCompleted && !isCancelled && index < 3
  );

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <Heading>Recent Campaign</Heading>

      <div className="w-full md:w-1/2">
        <Carousel
          autoPlay={false}
          loop={true}
          interval={0}
          renderDots={() => null}
        >
          {filteredCampaigns.map((campaign, index) => (
            <div key={index} className="md:w-[320px] h-[400px] md:mx-auto">
              <CampaignCard {...campaign} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
