import React from "react";
import path from "path";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { I18nextProvider } from "react-i18next";
import { Helmet } from "react-helmet";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionServer from "@emotion/server/create-instance";

import { App } from "client/containers/App/App";
import { createEmotionCache } from "client/utils/createEmotionCache";
import { theme } from "client/theme";

type RenderApp = {
  html?: string;
  redirect?: string;
};

export const renderApp = (req: Request, _res: Response): RenderApp => {
  const cache = createEmotionCache();
  const {
    extractCriticalToChunks,
    constructStyleTagsFromChunks,
  } = createEmotionServer(cache);

  const extractor = new ChunkExtractor({
    statsFile: path.resolve("build/loadable-stats.json"),
    entrypoints: ["client"],
  });

  const jsx = extractor.collectChunks(
    <CacheProvider value={cache}>
      <I18nextProvider i18n={req.i18n}>
        <StaticRouter location={req.url}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </StaticRouter>
      </I18nextProvider>
    </CacheProvider>
  );

  const markup = renderToString(jsx);
  const helmet = Helmet.renderStatic();

  const emotionChunks = extractCriticalToChunks(markup);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  const initialI18nStore = {};
  const initialLanguage = req.i18n.language;
  const usedNamespaces = req.i18n.reportNamespaces.getUsedNamespaces();

  req.i18n.languages.forEach((language) => {
    initialI18nStore[language] = {};

    usedNamespaces.forEach((namespace) => {
      initialI18nStore[language][namespace] =
        req.i18n.services.resourceStore.data[language][namespace];
    });
  });

  const html = `
    <!doctype html>
      <html lang="ru" ${helmet.htmlAttributes.toString()}>
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          <meta name="emotion-insertion-point" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          ${linkTags}
          ${emotionCss}
          ${styleTags}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${markup}</div>
          <script>
            window.initialLanguage = '${initialLanguage}';
            window.initialI18nStore = JSON.parse('${JSON.stringify(
              initialI18nStore
            )}');
          </script>
          ${scriptTags}
      </body>
    </html>`;

  return { html };
};
