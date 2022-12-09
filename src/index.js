import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import Login from "./containers/Login";
import Main from "./containers/main/Main";
import Register from "./containers/Register";


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/" component={Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
