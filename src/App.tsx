import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

import "./App.css";

const App: FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;
