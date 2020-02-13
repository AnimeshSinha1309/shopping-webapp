import React, { Component } from "react";

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

// TODO
// eslint-disable-next-line no-unused-vars
function getProducts(onlyReadyProds = false) {
    const prod = [];

    // each element in prod array should be an object
    // of name, status, quantity, quantity-remaining

    return prod;
}

function getProductList(onlyReadyProds = false) {
    const products = getProducts(onlyReadyProds);

    return products.map((elm, key) => <ProductListing {...elm} key={key}></ProductListing>);
}

class ProductList extends Component {
    render() {
        const filterBtn = <input type="checkbox" value="filter-ready" />,
            productList = getProductList();

        return (
            <React.Fragment>
                {filterBtn}
                {productList}
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

export default { ProductList, DispatchedProducts };
