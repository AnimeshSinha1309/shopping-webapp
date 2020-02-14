import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import CreateModal from "./Create";
import Navbar from "./Navbar";

// routing setup from here
// https://codeburst.io/getting-started-with-react-router-5c978f70df91

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create">Create product</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
            </ul>
            <Route path="/" component={Navbar}></Route>
            <Route path="/create" exact component={CreateModal}></Route>
        </div>
    </Router>
);


ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
