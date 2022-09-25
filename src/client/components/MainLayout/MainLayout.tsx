import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header/Header";

export const MainLayout: FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
