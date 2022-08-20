import fs from "fs";
import path from "path";
import express, { Request, Response } from "express";
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";

import i18n from "../i18n";
import { renderApp } from "./renderApp";

const appDirectory = fs.realpathSync(process.cwd());
const pathToLocales = path.resolve(appDirectory, "src/client/locales");

const server = express();

const bootstrap = () => {
  server
    .disable("x-powered-by")
    .use(i18nextMiddleware.handle(i18n))
    .use("/locales", express.static(pathToLocales, {}))
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .get("/*", async (req: Request, res: Response) => {
      const { html = "", redirect = "" } = await renderApp(req, res);
      if (redirect) {
        res.redirect(redirect);
      } else {
        res.send(html);
      }
    });
};

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      ns: ["app", "home", "about"],
      backend: {
        loadPath: `${pathToLocales}/{{lng}}/{{ns}}.json`,
        addPath: `${pathToLocales}/{{lng}}/{{ns}}.missing.json`,
      },
    },
    bootstrap
  );

export default server;
