import { Button, Heading } from "@chakra-ui/react";
import { PageLayout } from "@layouts/PageLayout";
import { useMetamask } from "@thirdweb-dev/react";
import React from "react";

export const ConnectWalletPrompt = () => {
  const connect = useMetamask();

  return (
    <PageLayout title="Connect Your Wallet">
      <Heading
        size={{ base: "lg", md: "xl" }}
        color="gray.400"
        textAlign="center"
        mt="10"
      >
        Please connect your wallet.
      </Heading>
    </PageLayout>
  );
};
