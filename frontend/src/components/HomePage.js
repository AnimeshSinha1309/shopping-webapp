import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Login, Register } from "./Modal";
import { currentUser } from "../config/data";
import { Welcome } from "./Welcome";
import { USER_TYPE_REV } from "../config/settings";

class HomePage extends Component {
    render() {
        const query = this.props.location.search,
            requiredAuth = query && query.match(/required=(\d+)/)[1],
            requiredType = requiredAuth !== undefined && USER_TYPE_REV[Number.parseInt(requiredAuth, 10)],
            displayMsg = <h2>This page is only for {requiredType}s</h2>,
            toast = requiredAuth ? displayMsg : <span></span>,
            loginRegister = this.props.login ? <Login></Login> : <Register></Register>,
            comp = currentUser ? <Welcome></Welcome> : loginRegister,
            finalComp = <React.Fragment>{comp}<br/>{toast}</React.Fragment>;

        return finalComp;
    }
}

HomePage.propTypes = {
    location: PropTypes.objectOf(PropTypes.string),
    login: PropTypes.bool,
    register: PropTypes.bool,
};

export { HomePage };
