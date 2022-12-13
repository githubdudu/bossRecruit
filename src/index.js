import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import Login from './containers/Login';
import Register from './containers/Register';
import HomePage from './containers/HomePage';
import AuthRoute from 'Containers/AuthRoute';
import Chat from 'Containers//Chat';
import Page404 from 'Containers//Page404/Page404';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <AuthRoute path="/home" component={HomePage}></AuthRoute>
        <AuthRoute path="/chat/:userid" component={Chat}></AuthRoute>
        <Redirect exact path="/" to="/home"></Redirect>
        <Route component={Page404}></Route>
      </Switch>
    </HashRouter>
  </Provider>,
);
