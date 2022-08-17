import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { HomePageLazy } from "../Home/Home.lazy";
import { AboutPageLazy } from "../About/About.lazy";

import "./App.css";

export const App: FC = () => {
  const [t] = useTranslation("app");

  return (
    <>
      <Helmet defaultTitle={t("meta.title")} />
      <Routes>
        <Route path="/*" element={<HomePageLazy />} />
        <Route path="/about" element={<AboutPageLazy />} />
      </Routes>
    </>
  );
};
