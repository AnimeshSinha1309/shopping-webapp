import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
import { getProductList, dispatchProduct, cancelProduct } from "../actions/productActions";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { PRODUCT_STATUS_REV } from "../config/settings";
import {
    isCustomer,
} from "../config/data";
import {
    reviewVendor, getOrders, editOrder, reviewProduct,
} from "../actions/orderActions";

import { filterFields } from "../utils/helper";
import "./ViewList.css";
import { isValid } from "../utils/errors";

class GeneralProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
        };
    }

    /**
     * @param {Event} ev click handler event
     */
    onClick(ev) {
        const node = ev.target;

        if (node.tagName === "BUTTON") {
            const tr = node.parentElement.parentElement,
                {
                    id, name, vendorid, status, productid: productId,
                } = tr.dataset;

            if (node.innerHTML === "Dispatch") {
                if (window.confirm(`Are you sure you want to dispatch ${name}?`)) {
                    dispatchProduct(id, (errors) => {
                        if (isValid(errors)) {
                            this.props.history.push("/view-dispatched");
                        } else {
                            alert(`Errors: ${errors.errors.join(", ")}`);
                        }
                    });
                }
            } else if (node.innerHTML === "Cancel") {
                if (window.confirm(`Are you sure you want to cancel ${name}?`)) {
                    cancelProduct(id, (errors) => {
                        if (isValid(errors)) {
                            this.props.history.push("/view-cancelled");
                        } else {
                            alert(`Errors: ${errors.errors.join(", ")}`);
                        }
                    });
                }
            } else if (node.innerHTML === "Edit") {
                const quant = window.prompt(`Enter new quantity for product ${name}`);

                if (!Number.isNaN(Number(quant))) {
                    editOrder(id, quant, (errors) => {
                        if (isValid(errors)) {
                            window.location.reload();
                        } else {
                            alert(`Errors: ${errors.errors.join(", ")}`);
                        }
                    });
                } else {
                    alert("Please enter valid number");
                }
            } else if (node.innerHTML === "Rate vendor") {
                const quant = window.prompt("Enter rating 1 (lowest) to 5 (highest)");

                if (!Number.isNaN(Number(quant))) {
                    const review = window.prompt("Enter review");

                    reviewVendor(vendorid, quant, review, (errors) => {
                        if (isValid(errors)) {
                            window.location.reload();
                        } else {
                            alert(`Errors: ${errors.errors.join(", ")}`);
                        }
                    });
                } else {
                    alert("Please enter valid number");
                }
            } else if (node.innerHTML === "Rate product") {
                const quant = window.prompt("Enter rating 1 (lowest) to 5 (highest)");

                if (Number(status) !== PRODUCT_STATUS_REV.DISPATCHED) {
                    alert("Can only review dispatched produtcs");
                } else if (!Number.isNaN(Number(quant))) {
                    const review = window.prompt("Enter review");

                    reviewProduct(productId, quant, review, (errors) => {
                        if (isValid(errors)) {
                            window.location.reload();
                        } else {
                            alert(`Errors: ${errors.errors.join(", ")}`);
                        }
                    });
                } else {
                    alert("Please enter valid number");
                }
            } else if (node.innerHTML === "View reviews") {
                window.location.href = `/product-review?product=${id}`;
            } else if (node.dataset) {
                const copy = this.state.products.slice(0);

                switch (node.dataset.sort) {
                case "price":
                    copy.sort((a, b) => Number(a.price) - Number(b.price));
                    break;
                case "quantity":
                    copy.sort((a, b) => Number(a.quantityRem) - Number(b.quantityRem));
                    break;
                case "seller":
                    copy.sort((a, b) => -Number(a.rating) + Number(b.rating));
                    break;
                default:
                }

                this.setState({ products: copy });
            }
        }
    }

    componentDidMount() {
        getProductList(this.type, (products) => {
            if (isValid(products)) {
                this.setState({ products });
            }
        });
    }

    /**
     * Asynchronous render function
     */
    render() {
        let inner;

        if (this.state.products) {
            let btnText = "";
            switch (this.type) {
            case PRODUCT_STATUS_REV.WAITING: btnText = ["Cancel"]; break;
            case PRODUCT_STATUS_REV.PLACED: btnText = ["Dispatch"]; break;
            case PRODUCT_STATUS_REV.DISPATCHED: btnText = ["View reviews"]; break;
            case 42: btnText = ["Edit", "Rate vendor", "Rate product"]; break;
            default:
            }

            this.table = makeTableFromObjectArray(this.state.products, undefined, btnText);

            if (this.state.products.length === 0) {
                inner = this.table;
            } else {
                const lastButton = isCustomer
                        ? <Button key={2} data-sort="seller">Sort by seller rating</Button>
                        : <span></span>,
                    buttons = [
                        <Button key={0} data-sort="price">Sort by price</Button>,
                        <Button key={1} data-sort="quantity">Sort by quantity left</Button>,
                        lastButton,
                    ];


                inner = (<React.Fragment>
                    <div>
                        {buttons}
                    </div>
                    {this.table}
                </React.Fragment>);
            }
        } else { inner = (<div>Loading...</div>); }

        const wrapper = <MDBContainer>
            <MDBRow>
                <h1>{this.headerText}</h1>
                <MDBCol size="12" onClick={this.onClick.bind(this)}>
                    {inner}
                </MDBCol>
            </MDBRow>
        </MDBContainer>;

        return wrapper;
    }
}

GeneralProductList.propTypes = {
    history: PropTypes.objectOf(PropTypes.any),
};

class WaitingProducts extends GeneralProductList {
    constructor(props) {
        super(props);

        this.headerText = "Waiting products";
        this.type = PRODUCT_STATUS_REV.WAITING;
    }
}

class DispatchReadyProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.headerText = "Placed products";
        this.type = PRODUCT_STATUS_REV.PLACED;
    }
}

class DispatchedProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.headerText = "Dispatched products";
        this.type = PRODUCT_STATUS_REV.DISPATCHED;
    }
}

class CancelledProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.headerText = "Cancelled products";
        this.type = PRODUCT_STATUS_REV.CANCELLED;
    }
}

class OrderList extends GeneralProductList {
    constructor(props) {
        super(props);
        this.headerText = "Your orders";
        this.type = 42; // distinct from others
    }

    componentDidMount() {
        getOrders((orders) => {
            if (isValid(orders)) {
                orders = filterFields(orders);

                this.setState({ products: orders });
            }
        });
    }
}


export {
    WaitingProducts, DispatchedProducts, DispatchReadyProducts, CancelledProducts, OrderList,
};
