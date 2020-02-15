import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerNav extends Component {
    render() {
        return (<li className="nav-item">
        </li>);
    }
}
class VendorNav extends Component {
    render() {
        return (<li className="nav-item">
            <Link className="nav-link" to="/create">Create product</Link>
        </li>);
    }
}

export { CustomerNav, VendorNav };
