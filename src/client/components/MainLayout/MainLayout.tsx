import React, { FC, ReactNode } from "react";

import { Header } from "../Header/Header";

type Props = {
  children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
