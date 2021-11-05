import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateFlight from "../components/CreateFlight/CreateFlight";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/createFlight" exact component={CreateFlight} />
      </Switch>
    </Router>
  );
};
export default Routes;
