import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import { Resource } from "i18next";
import { useSSR } from "react-i18next";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { App } from "client/containers/App/App";
import { createEmotionCache } from "client/utils/createEmotionCache";
import { theme } from "client/theme";
import "../i18n";

declare global {
  interface Window {
    initialI18nStore: Resource;
    initialLanguage: string;
    emotionCache?: EmotionCache;
  }
}

const clientSideEmotionCache = createEmotionCache();

const BaseApp = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  const emotionCache = clientSideEmotionCache;

  return (
    <CacheProvider value={emotionCache}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </CacheProvider>
  );
};

loadableReady().then(() => {
  createRoot(document.getElementById("root")!).render(<BaseApp />);
});

if (module.hot) {
  module.hot.accept();
}
