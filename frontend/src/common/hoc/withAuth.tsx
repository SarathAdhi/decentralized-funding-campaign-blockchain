import { ConnectWalletPrompt } from "@components/ConnectWalletPage";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

const withAuth = (Component: React.FC) =>
  function PageProp({ ...pageProps }) {
    const address = useAddress();

    if (!!address) return <Component {...pageProps} />;
    else return <ConnectWalletPrompt />;
  };

withAuth.displayName = "withAuth";
export default withAuth;
