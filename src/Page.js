import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from "./App";
import Index from "./views/Index";
import Login from "./views/Login";
import Register from "./views/Register";
import ForgetPassword from "./views/ForgetPassword";
import ForgetMobile from "./views/ForgetMobile";
import ForgetEmail from "./views/ForgetEmail";
import ForgetReset from "./views/ForgetReset";
import Test from "./components/Test";
import 'antd/dist/antd.css';
import "./styles/base.css";
import "./styles/common.less";

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" push />} />
            <Route exact path="/index" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgetPassword" component={ForgetPassword} />
            <Route exact path="/forgetMobile" component={ForgetMobile} />
            <Route exact path="/forgetEmail" component={ForgetEmail} />
            <Route exact path="/forgetReset" component={ForgetReset} />
            <Route exact path="/test" component={Test} />
            <Route component={App} />
        </Switch>
    </Router>
);
