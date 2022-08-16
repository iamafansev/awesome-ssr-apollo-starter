import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { MainLayout } from "client/components/MainLayout/MainLayout";

import "./Home.css";

export const Home: FC = () => {
  const [t] = useTranslation("home");

  return (
    <MainLayout>
      <Helmet title={t("meta.title")} />
      <div className="Home">
        <div className="Home-header">
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
      </div>
    </MainLayout>
  );
};