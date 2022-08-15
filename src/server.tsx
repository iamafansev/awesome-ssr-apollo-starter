import React from "react";
import path from "path";
import express, { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter, StaticRouterProps } from "react-router-dom";
import { ChunkExtractor } from "@loadable/server";

import { App } from "./containers/App/App";

type RenderApp = {
  html?: string;
  redirect?: string;
};

export const renderApp = (req: Request, _res: express.Response): RenderApp => {
  const context: StaticRouterProps["context"] = {};

  const extractor = new ChunkExtractor({
    statsFile: path.resolve("build/loadable-stats.json"),
    entrypoints: ["client"],
  });

  const jsx = extractor.collectChunks(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );

  const markup = renderToString(jsx);

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  if (context.url) {
    return { redirect: context.url };
  }

  const html = `
    <!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${linkTags}
          ${styleTags}
      </head>
      <body>
          <div id="root">${markup}</div>
          ${scriptTags}
      </body>
    </html>`;

  return { html };
};

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", async (req: Request, res: Response) => {
    const { html = "", redirect = "" } = await renderApp(req, res);
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.send(html);
    }
  });

export default server;
