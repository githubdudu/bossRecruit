import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import Login from "./containers/login/Login";
import Main from "./containers/main/Main";
import Register from "./containers/register/Register";


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/" component={Main}></Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
