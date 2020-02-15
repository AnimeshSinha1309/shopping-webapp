import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerNav extends Component {
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}
class VendorNav extends Component {
    render() {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/create">Create product</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-products">View my products</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-dispatch-ready">View dispatch-ready products</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-dispatched">View dispatched products</Link>
                </li>
            </React.Fragment>
        );
    }
}

export { CustomerNav, VendorNav };
