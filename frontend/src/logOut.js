import React, { Component } from "react";
import { logoutUser } from "./actions/authActions";

class LogOutBtn extends Component {
    handleOnClick() {
        logoutUser(() => { window.location.href = "/login"; });
    }

    render() {
        return (<li className="navbar-text"><a href="#" onClick={this.handleOnClick.bind(this)}> Log Out</a></li>);
    }
}


export { LogOutBtn };
