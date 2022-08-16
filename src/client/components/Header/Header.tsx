import React, { FC } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

export const Header: FC = () => {
  return (
    <header className="Header">
      <nav className="HeaderNav">
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
      </nav>
    </header>
  );
};
