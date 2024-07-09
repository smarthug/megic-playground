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
        {/* <link rel="manifest" href="/manifest.json" /> */}
        {/* <ManifestLink /> */}
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
