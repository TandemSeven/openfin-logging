import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Notification from "./pages/notification";
import Window from "./pages/window";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/notification">
            <Notification />
          </Route>
          <Route path="/window">
            <Window />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
