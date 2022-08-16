import React from "react";
import path from "path";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
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
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const markup = renderToString(jsx);
  const helmet = Helmet.renderStatic();

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  const html = `
    <!doctype html>
      <html lang="" ${helmet.htmlAttributes.toString()}>
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
          ${scriptTags}
      </body>
    </html>`;

  return { html };
};
