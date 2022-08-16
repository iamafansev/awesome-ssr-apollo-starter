import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import { HomePageLazy } from "../Home/Home.lazy";

import "./App.css";

export const App: FC = () => (
  <Routes>
    <Route path="/*" element={<HomePageLazy />} />
  </Routes>
);
