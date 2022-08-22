import React from "react";
import path from "path";
import fetch from "cross-fetch";
import { Request, Response } from "express";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { I18nextProvider } from "react-i18next";
import { Helmet } from "react-helmet";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionServer from "@emotion/server/create-instance";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import { App } from "client/containers/App/App";
import { createEmotionCache } from "client/utils/createEmotionCache";
import { theme } from "client/theme";

type RenderApp = {
  html?: string;
  redirect?: string;
};

export const renderApp = async (
  req: Request,
  _res: Response
): Promise<RenderApp> => {
  const cache = createEmotionCache();
  const {
    extractCriticalToChunks,
    constructStyleTagsFromChunks,
  } = createEmotionServer(cache);

  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "https://flyby-gateway.herokuapp.com/",
      fetch,
      headers: {
        cookie: req.header("Cookie"),
      },
    }),
    cache: new InMemoryCache(),
  });

  const extractor = new ChunkExtractor({
    statsFile: path.resolve("build/loadable-stats.json"),
    entrypoints: ["client"],
  });

  const app = (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  );

  const renderedApp = extractor.collectChunks(app);
  const markup = await renderToStringWithData(renderedApp);

  const initialState = apolloClient.extract();

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
            window.__APOLLO_STATE__ = ${JSON.stringify(initialState).replace(
              /</g,
              "\\u003c"
            )}
          </script>
          ${scriptTags}
      </body>
    </html>`;

  return { html };
};
