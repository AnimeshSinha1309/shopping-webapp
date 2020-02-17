import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerNav extends Component {
    render() {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/search">Search</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-orders">View my orders</Link>
                </li>
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
                    <Link className="nav-link" to="/view-waiting">Waiting products</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-placed">Placed products</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-dispatched">Dispatched products</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/view-cancelled">Cancelled products</Link>
                </li>
            </React.Fragment>
        );
    }
}

export { CustomerNav, VendorNav };
