import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./containers/Home/Home";

import "./App.css";

export const App: FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);
