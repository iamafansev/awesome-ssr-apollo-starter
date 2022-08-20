import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import { Resource } from "i18next";
import { useSSR } from "react-i18next";

import "../i18n";
import { App } from "./containers/App/App";

declare global {
  interface Window {
    initialI18nStore: Resource;
    initialLanguage: string;
  }
}

const BaseApp = () => {
  useSSR(window.initialI18nStore, window.initialLanguage);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

loadableReady().then(() => {
  createRoot(document.getElementById("root")!).render(<BaseApp />);
});

if (module.hot) {
  module.hot.accept();
}
