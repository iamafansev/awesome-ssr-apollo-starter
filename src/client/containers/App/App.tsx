import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import { HomePageLazy } from "../Home/Home.lazy";

import "./App.css";

export const App: FC = () => (
  <Switch>
    <Route exact path="/" component={HomePageLazy} />
  </Switch>
);
