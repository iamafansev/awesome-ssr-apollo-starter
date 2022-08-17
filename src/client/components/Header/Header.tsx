import React, { FC } from "react";
import { Link } from "react-router-dom";

import { homeRoute, aboutRoute } from "client/constants/routes";

import "./Header.css";

export const Header: FC = () => {
  return (
    <header className="Header">
      <nav className="HeaderNav">
        <Link to={homeRoute}>home</Link>
        <Link to={aboutRoute}>about</Link>
      </nav>
    </header>
  );
};
