import React, { Component } from "react";

class ProductListing extends Component {
    render() {
        return (
            <div>
                <span className="name">{this.props.name}</span>
                <span className="status"></span>
                <span className="quantity"></span>
                <span className="quantity-remaining"></span>
            </div>
        );
    }
}

ProductListing.propTypes = {
    name: String,
};

class ProductList extends Component {
    // TODO
    getProducts() {
        const prod = [];

        // each element in prod array should be an object
        // of name, status, quantity, quantity-remaining

        return prod;
    }

    render() {
        const products = this.getProducts();

        return (products.map((elm, key) => <ProductListing {...elm} key={key}></ProductListing>));
    }
}

export default ProductList;
