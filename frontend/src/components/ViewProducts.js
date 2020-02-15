import React, { Component } from "react";
import { getProductList } from "../actions/productActions";

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
    render() {
        const filterBtn = <input type="checkbox" value="filter-ready" />,
            products = getProductList(),
            productList = products.map((elm, key) => <ProductListing {...elm} key={key}></ProductListing>);

        return (
            <React.Fragment>
                {filterBtn}
                {productList}
            </React.Fragment>
        );
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
                {getProductList(true)}
            </React.Fragment>
        );
    }
}

export { ProductList, DispatchedProducts, DispatchReadyProducts };
