import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import { HomePageLazy } from "../Home/Home.lazy";
import { AboutPageLazy } from "../About/About.lazy";

import "./App.css";

export const App: FC = () => (
  <>
    <Helmet defaultTitle="Nayoli" />
    <Routes>
      <Route path="/*" element={<HomePageLazy />} />
      <Route path="/about" element={<AboutPageLazy />} />
    </Routes>
  </>
);
