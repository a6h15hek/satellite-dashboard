import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";


// pages for this product
import HomePage from "views/HomePage/HomePage";
import AboutUsPage from "views/AboutUsPage/AboutUsPage";
import LoginPage from "views/LoginPage/LoginPage";
import PageNotFound from "views/PageNotFound/PageNotFound";
import SignUpPage from "views/SignUpPage/SignUpPage";
import Dashboard from "views/Dashboard/Dashboard";

//testing .env file
//console.log(process.env);

var hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/aboutus" component={AboutUsPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/homepage" component={HomePage} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
