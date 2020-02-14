import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import CreateModal from "./Create";
import Modal from "./components/auth/Login";

const routing = (<Router>
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
                    <li className="nav-item">
                        <Link className="nav-link" to="/create">Create product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </div>
        <Route path="/" exact component={Modal}></Route>
        <Route path="/create" exact component={CreateModal}></Route>
    </div>
</Router>);


export default routing;
