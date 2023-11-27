import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Goerli } from "@thirdweb-dev/chains";
// import ethers from "ethers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={Goerli}
      // signer={new ethers.providers.Web3Provider(window.ethereum).getSigner()}
      clientId="85ed24e5602c3939b93daeb24d727067"
      secretKey="tdy0pmrbQECJNVvc-7DRmVGOCGuiB6dxtgcxrUmuo0a1xJkF4Q8sDApDsf6-lcoSkxOvAhPbGtmLMq75K_UChg"
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}
