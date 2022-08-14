import express, { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter, StaticRouterProps } from "react-router-dom";
import React from "react";

import { App } from "./App";

type AssetName = "client";

type Assets = Record<
  AssetName,
  {
    css?: string[];
    js?: string[];
  }
>;

// eslint-disable-next-line global-require
const assets: Assets = require(process.env.RAZZLE_ASSETS_MANIFEST!) as Assets;

const cssLinksFromAssets = (entrypoint: AssetName) => {
  const { css } = assets[entrypoint];
  if (css) {
    return css
      .map((asset) => `<link rel="stylesheet" href="${asset}">`)
      .join("");
  }

  return "";
};

const jsScriptTagsFromAssets = (entrypoint: AssetName, extra = "") => {
  const { js } = assets[entrypoint];
  if (js) {
    return js
      .map((asset) => `<script src="${asset}"${extra}></script>`)
      .join("");
  }

  return "";
};

type RenderApp = {
  html?: string;
  redirect?: string;
};

export const renderApp = (req: Request, _res: express.Response): RenderApp => {
  const context: StaticRouterProps["context"] = {};

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );

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
          ${cssLinksFromAssets("client")}
      </head>
      <body>
          <div id="root">${markup}</div>
          ${jsScriptTagsFromAssets("client", " defer crossorigin")}
      </body>
    </html>`;

  return { html };
};

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", (req: Request, res: Response) => {
    const { html = "", redirect = "" } = renderApp(req, res);
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.send(html);
    }
  });

export default server;
