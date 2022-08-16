import express, { Request, Response } from "express";

import { renderApp } from "./renderApp";

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
