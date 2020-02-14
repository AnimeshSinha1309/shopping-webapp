import React, { Component } from "react";
import { logoutUser } from "./actions/authActions";

class LogOutBtn extends Component {
    handleOnClick() {
        logoutUser(() => window.location.reload());
    }

    render() {
        return (<div className="navbar-text" ><a href="#" onClick={this.handleOnClick.bind(this)}> Log Out</a></div>);
    }
}


export { LogOutBtn };
