import React from "react";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export const CampaignLoadingSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((e) => (
        <Box
          key={e}
          padding="3"
          boxShadow="lg"
          className="!bg-gray-800"
          borderRadius="lg"
        >
          <Skeleton height="150px" borderRadius="lg" />
          <SkeletonText mt="4" noOfLines={4} spacing="2" skeletonHeight="2" />
        </Box>
      ))}
    </>
  );
};
