import React from "react";
import {
    Route, Link, Router, Switch,
} from "react-router-dom";
import { CustomerNav, VendorNav } from "./UserSpecificNav";
import { currentUser, isVendor } from "../config/data";
import CreateModal from "./Create";
import Modal from "./Login";
import NotFound from "./404";
import history from "../history";
import { LogOutBtn } from "../logOut";
import { Welcome } from "./Welcome";
import About from "./About";
import { ProductList, DispatchReadyProducts, DispatchedProducts } from "./ViewProducts";

let welcomeElm,
    logOutBtn,
    navbarBtns;

if (currentUser) {
    welcomeElm = Welcome;
    logOutBtn = <LogOutBtn></LogOutBtn>;
    navbarBtns = isVendor ? <VendorNav></VendorNav> : <CustomerNav></CustomerNav>;
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
                </ul>
                <ul>
                    <li className="navbar-text">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    {logOutBtn}
                </ul>
            </div>
        </div>
        {/* switch helps us specify a default case if no route path matches */}
        <Switch>
            <Route path="/" exact component={welcomeElm}></Route>

            {/* Vendor routes */}
            <Route path="/create" exact component={CreateModal}></Route>
            <Route path="/view-products" exact component={ProductList}></Route>
            <Route path="/view-dispatch-ready" exact component={DispatchReadyProducts}></Route>
            <Route path="/view-dispatched" exact component={DispatchedProducts}></Route>

            {/* Customer routes */}


            <Route path="/about" exact component={About}></Route>
            <Route component={NotFound}></Route>
        </Switch>
    </div>
</Router>);


export default routing;
