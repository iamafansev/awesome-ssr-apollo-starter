import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { homeRoute, aboutRoute } from "client/constants/routes";
import { HomePageLazy } from "client/containers/Home/Home.lazy";
import { AboutPageLazy } from "client/containers/About/About.lazy";
import { MainLayout } from "client/components/MainLayout/MainLayout";

import "./App.css";

export const App: FC = () => {
  const [t] = useTranslation("app");

  return (
    <>
      <Helmet defaultTitle={t("meta.title")} />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path={homeRoute} element={<HomePageLazy />} />
          <Route path={aboutRoute} element={<AboutPageLazy />} />
        </Route>
      </Routes>
    </>
  );
};
