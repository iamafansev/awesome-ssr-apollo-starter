import React, { FC } from "react";

import "./Home.css";

export const Home: FC = () => {
  return (
    <div className="Home">
      <div className="Home-header">
        <h2>Welcome to Razzle</h2>
      </div>
      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
      </ul>
    </div>
  );
};
