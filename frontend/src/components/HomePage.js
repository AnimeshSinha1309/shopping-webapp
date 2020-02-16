import React, { Component } from "react";
import { Modal } from "reactstrap";
import { isVendor } from "../config/data";
import { Welcome } from "./Welcome";
import { USER_TYPE_REV } from "../config/settings";


class HomePage extends Component {
    render() {
        const query = this.props.location.search,
            requiredAuth = query && query.match(/required=(\d+)/)[1],
            requiredType = requiredAuth !== undefined && USER_TYPE_REV[Number.parseInt(requiredAuth, 10)],
            displayMsg = <h2>This page is only for {requiredType}s</h2>,
            toast = requiredAuth ? displayMsg : <span></span>,
            comp = isVendor ? <Welcome></Welcome> : <Modal></Modal>,
            finalComp = <React.Fragment>{comp}<br/>{toast}</React.Fragment>;
        console.log(query, requiredAuth, requiredType, displayMsg, this.props.location.search);


        return finalComp;
    }
}

HomePage.propTypes = {
    location: Object,
};

export { HomePage };
