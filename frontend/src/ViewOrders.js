import React, { Component } from "react";

class OrderListing extends Component {
    render() {
        return (
            <div>
                <span className="name">{this.props.name}</span>
            </div>
        );
    }
}

OrderListing.propTypes = {
    name: String,
    remaining: Number,
};

// TODO
// eslint-disable-next-line no-unused-vars
function getOrders(onlyReadyProds = false) {
    const orders = [];

    // each element in orders array should be an object
    // of foreign key to product, status,

    return orders;
}

function getOrderList(onlyReadyProds = false) {
    const products = getOrders(onlyReadyProds);

    return products.map((elm, key) => <OrderListing {...elm} key={key}></OrderListing>);
}

class OrderList extends Component {
    render() {
        const orderList = getOrderList();

        return (
            <React.Fragment>
                {orderList}
            </React.Fragment>
        );
    }
}


export default { OrderList };
