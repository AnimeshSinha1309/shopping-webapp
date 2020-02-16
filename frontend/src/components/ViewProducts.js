import React, { Component } from "react";
import { getProductList } from "../actions/productActions";
import { makeTableFromObjectArray } from "../utils/makeTable";

class ProductListing extends Component {
    render() {
        const { remaining } = this.props; let updateElm;

        if (remaining) {
            updateElm = (<React.Fragment> <span className="quantity-remaining"></span>
                <button><i className="fas fa-bin"></i></button></React.Fragment>);
        } else {
            updateElm = <button><i className="fas fa-dispatch"></i></button>;
        }

        return (
            <div>
                <span className="name">{this.props.name}</span>
                <span className="status"></span>
                <span className="quantity"></span>
                {updateElm}
            </div>
        );
    }
}

ProductListing.propTypes = {
    name: String,
    remaining: Number,
};


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: null,
        };
    }

    componentDidMount() {
        // const filterBtn = <input type="checkbox" value="filter-ready" />;

        getProductList((products) => {
            this.setState({ table: makeTableFromObjectArray(products) });
        });
    }

    /**
     * Asynchronous render function
     */
    render() {
        if (this.state.table) {
            return this.state.table;
        }

        return (<div>Loading...</div>);
    }
}

class DispatchReadyProducts extends Component {
    render() {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}

class DispatchedProducts extends Component {
    render() {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}

export { ProductList, DispatchedProducts, DispatchReadyProducts };
