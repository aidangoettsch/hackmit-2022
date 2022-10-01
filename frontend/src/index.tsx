import React from "react";
import ReactDOM from "react-dom/client";
import App from "./router";

import { MantineProvider, Global } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import { NotificationsProvider } from "@mantine/notifications";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Soehne",
            src: `url('/soehne.woff2') format("woff2")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "UniSans",
            src: `url('/UniSans.otf') format("opentype")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
      ]}
    />
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: "dark",
        primaryColor: "yellow",
        fontFamily:
          "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
        headings: { fontFamily: "Soehne" },
        colors: {
          // override dark colors to change them for all components
          dark: [
            "#C1C2C5",
            "#A6A7AB",
            "#909296",
            "#5C5F66",
            "#141517",
            "#141517",
            "#141517",
            "#101113",
            "#141517",
            "#101113",
          ],
        },
      }}
    >
      <BrowserRouter>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
