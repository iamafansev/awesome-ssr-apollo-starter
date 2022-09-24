import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import { useSSR } from "react-i18next";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { App } from "client/containers/App/App";
import { createEmotionCache } from "client/utils/createEmotionCache";
import { theme } from "client/theme";
import "../i18n";

const clientSideEmotionCache = createEmotionCache();

const client = new ApolloClient({
  uri: "http://flyby-gateway.herokuapp.com/",
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const BaseApp = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={clientSideEmotionCache}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </CacheProvider>
    </ApolloProvider>
  );
};

loadableReady().then(() => {
  createRoot(document.getElementById("root")!).render(<BaseApp />);
});

if (module.hot) {
  module.hot.accept();
}
