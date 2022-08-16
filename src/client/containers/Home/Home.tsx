import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import "./Home.css";

export const Home: FC = () => {
  const [t] = useTranslation("translations");

  return (
    <>
      <Helmet title="Home page" />
      <div className="Home">
        <div className="Home-header">
          <h2>{t("message.welcome")}</h2>
        </div>
        <ul className="Home-resources">
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
        </ul>
      </div>
    </>
  );
};
