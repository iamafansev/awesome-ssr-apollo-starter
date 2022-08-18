import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { MainLayout } from "client/components/MainLayout/MainLayout";

import "./About.css";

export const About: FC = () => {
  const { t } = useTranslation("about");

  return (
    <MainLayout>
      <Helmet title={t("meta.title")} />
      <div className="About">
        <div className="About-header">
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
      </div>
    </MainLayout>
  );
};
