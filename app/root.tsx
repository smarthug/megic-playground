import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/global.css?url";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { theme } from "./styles/theme";

// import { ThemeProvider } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, root } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Import The Root Network chain ID
const rootNetworkTestnet = {
  id: 7672,
  name: "Root Network Testnet",
  network: "root-testnet",
  rpcUrls: {
    default: "https://testnet.root.rootnet.live/archive", // Replace with actual RPC URL
  },
  nativeCurrency: {
    name: "Test XRP",
    symbol: "TXRP",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Root Explorer",
      url: "https://testnet-explorer.rootnet.live",
    },
  },
  testnet: true,
};

// Root Network Mainnet configuration
const rootNetworkMainnet = {
  id: 7668,
  name: "Root Network Mainnet",
  network: "root-mainnet",
  rpcUrls: {
    default: "https://root.rootnet.live/archive", // Replace with actual RPC URL if different
  },
  nativeCurrency: {
    name: "XRP",
    symbol: "XRP",
    decimals: 18,
  },
  blockExplorers: {
    default: { name: "Root Explorer", url: "https://explorer.rootnet.live" },
  },
  testnet: false,
};

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "fc8b5ed20be8c39819928d4a45318f7e",
  chains: [rootNetworkTestnet, rootNetworkMainnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Outlet />
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
