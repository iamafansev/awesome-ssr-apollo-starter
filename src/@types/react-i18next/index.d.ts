import "react-i18next";

import home from "client/locales/ru/home.json";
import about from "client/locales/ru/about.json";
import app from "client/locales/ru/app.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "app";
    resources: {
      home: typeof home;
      about: typeof about;
      app: typeof app;
    };
  }
}
