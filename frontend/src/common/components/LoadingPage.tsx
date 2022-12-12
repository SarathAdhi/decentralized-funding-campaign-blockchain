import { Spinner } from "@chakra-ui/react";
import { PageLayout } from "@layouts/PageLayout";
import React from "react";

export const LoadingPage = () => {
  return (
    <PageLayout title="Loading" className="grid place-content-center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="lg"
      />
    </PageLayout>
  );
};
