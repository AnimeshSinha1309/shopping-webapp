import React from "react";
import {
    Route, Link, BrowserRouter as Router, Switch,
} from "react-router-dom";
import CreateModal from "./Create";
import Modal from "./components/auth/Login";
import NotFound from "./404";
import history from "./history";
import { LogOutBtn } from "./logOut";
import { Welcome } from "./Welcome";
import { currentUser, isVendor } from "./config/data";
import { CustomerNav, VendorNav } from "./UserSpecificNav";

let welcomeElm,
    logOutBtn,
    navbarBtns;

if (currentUser) {
    welcomeElm = Welcome;
    logOutBtn = <LogOutBtn></LogOutBtn>;
    navbarBtns = isVendor ? VendorNav : CustomerNav;
} else {
    welcomeElm = Modal;
    logOutBtn = <span></span>;
    navbarBtns = <React.Fragment></React.Fragment>;
}

const routing = (<Router history={history}>
    <div>
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="index.html">Shopping webapp</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {navbarBtns}
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
                {logOutBtn}
            </div>
        </div>
        {/* switch helps us specify a default case if no route path matches */}
        <Switch>
            <Route path="/" exact component={welcomeElm}></Route>
            <Route path="/create" exact component={CreateModal}></Route>
            <Route component={NotFound}></Route>
        </Switch>
    </div>
</Router>);


export default routing;
