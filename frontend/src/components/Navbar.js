import React, { Component } from "react";
import {
    Route, Link, Router, Switch, Redirect,
} from "react-router-dom";
import { PropTypes } from "prop-types";
import { CustomerNav, VendorNav } from "./UserSpecificNav";
import { currentUser, isVendor, currentUserObj } from "../config/data";
import CreateModal from "./Create";
import NotFound from "./404";
import history from "../history";
import { LogOutBtn } from "../logOut";
import About from "./About";
import {
    WaitingProducts, DispatchReadyProducts, DispatchedProducts, CancelledProducts, OrderList,
} from "./ViewList";
import { Search } from "./Search";
import { USER_TYPE } from "../config/settings";
import { HomePage } from "./HomePage";

let logOutBtn,
    navbarBtns;

if (currentUser) {
    logOutBtn = <LogOutBtn></LogOutBtn>;
    navbarBtns = isVendor ? <VendorNav></VendorNav> : <CustomerNav></CustomerNav>;
} else {
    logOutBtn = <span></span>;
    navbarBtns = <React.Fragment>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
    </React.Fragment>;
}

/**
 * If user navigates to page with insufficient privilege, stop in the tracks
 * https://stackoverflow.com/a/50756257/2181238 use this approach
 * @param {Number} requiredUserType
 */
function requireAuth(requiredUserType) {
    class AuthRequired extends Component {
        render() {
            if (!currentUser || Number(currentUserObj.usertype) !== Number(requiredUserType)) {
                return <Redirect to={`/?required=${requiredUserType}`}></Redirect>;
            }
            return <Route path={this.props.path} exact component={this.props.component} />;
        }
    }

    AuthRequired.propTypes = {
        path: PropTypes.string,
        component: PropTypes.elementType,
    };

    return AuthRequired;
}

const VendorAuth = requireAuth(USER_TYPE.vendor),
    CustomerAuth = requireAuth(USER_TYPE.customer),
    routing = (<Router history={history}>
        <div>
            <div className="mb-5 navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Shopping webapp</Link>

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
                <Route path="/" exact component={HomePage}></Route>
                <Route path="/login" exact render={props => <HomePage {...props} login></HomePage>}></Route>
                <Route path="/register" exact render={props => <HomePage {...props} register></HomePage>}></Route>
                <Route path="/?required=:id" exact component={HomePage}></Route>

                {/* Vendor routes */}
                <VendorAuth path="/create" component={CreateModal}></VendorAuth>
                {/* <Route path="/create" exact component={CreateModal} onEnter={vendorAuth}></Route> */}
                <VendorAuth path="/view-waiting" component={WaitingProducts}></VendorAuth>
                <VendorAuth path="/view-placed" component={DispatchReadyProducts}></VendorAuth>
                <VendorAuth path="/view-dispatched" component={DispatchedProducts}></VendorAuth>
                <VendorAuth path="/view-cancelled" component={CancelledProducts}></VendorAuth>

                {/* Customer routes */}
                <CustomerAuth path="/search" component={Search}></CustomerAuth>
                <CustomerAuth path="/view-orders" component={OrderList}></CustomerAuth>

                <Route path="/about" exact component={About}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </div>
    </Router>);


export default routing;
