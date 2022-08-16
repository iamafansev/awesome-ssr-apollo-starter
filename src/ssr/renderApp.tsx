import React from "react";
import path from "path";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { I18nextProvider } from "react-i18next";
import { Helmet } from "react-helmet";

import { App } from "../client/containers/App/App";

type RenderApp = {
  html?: string;
  redirect?: string;
};

export const renderApp = (req: Request, _res: Response): RenderApp => {
  const extractor = new ChunkExtractor({
    statsFile: path.resolve("build/loadable-stats.json"),
    entrypoints: ["client"],
  });

  const jsx = extractor.collectChunks(
    <I18nextProvider i18n={req.i18n}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </I18nextProvider>
  );

  const markup = renderToString(jsx);
  const helmet = Helmet.renderStatic();

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
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${linkTags}
          ${styleTags}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${markup}</div>
          <script>
            window.initialI18nStore = JSON.parse('${JSON.stringify(
              initialI18nStore
            )}');
            window.initialLanguage = '${initialLanguage}';
          </script>
          ${scriptTags}
      </body>
    </html>`;

  return { html };
};
