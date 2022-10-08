import "react-i18next";

import home from "../../../public/locales/ru/home.json";
import about from "../../../public/locales/ru/about.json";
import app from "../../../public/locales/ru/app.json";

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
