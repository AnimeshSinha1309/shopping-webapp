import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Button } from "reactstrap";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
import { getProductList, dispatchProduct, cancelProduct } from "../actions/productActions";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { PRODUCT_STATUS_REV } from "../config/settings";
import {
    isCustomer,
} from "../config/data";
import { getOrders } from "../actions/orderActions";
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
                { id, name } = tr.dataset;
            if (node.innerHTML === "Dispatch") {
                if (window.confirm(`Are you sure you want to dispatch ${name}?`)) {
                    dispatchProduct(id, (errors) => {
                        if (isValid(errors)) {
                            this.props.history.push("/view-dispatched");
                        } else {
                            // TODO
                        }
                    });
                }
            } else if (node.innerHTML === "Cancel") {
                if (window.confirm(`Are you sure you want to cancel ${name}?`)) {
                    cancelProduct(id, (errors) => {
                        if (isValid(errors)) {
                            this.props.history.push("/view-cancelled");
                        } else {
                            // TODO
                        }
                    });
                }
            } else if (node.dataset) {
                const copy = this.state.products.slice(0);

                switch (node.dataset.sort) {
                case "price":
                    copy.sort((a, b) => Number(a.price) - Number(b.price));
                    break;
                case "quantity":
                    copy.sort((a, b) => Number(a.quantityRem) - Number(b.quantityRem));
                    break;
                    // TODO
                // case "seller":
                //     copy.sort((a, b) => a.quantityRem - b.quantityRem);
                //     break;
                default:
                }

                this.setState({ products: copy });
            }
        }
    }

    componentDidMount() {
        getProductList(this.type, (products) => {
            if (products.isValid === false) {
                // TODO
            } else {
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
            case PRODUCT_STATUS_REV.WAITING: btnText = "Cancel"; break;
            case PRODUCT_STATUS_REV.PLACED: btnText = "Dispatch"; break;
            default:
            }
            this.table = makeTableFromObjectArray(this.state.products, undefined, btnText);
            console.log(this.state.products);

            if (this.state.products.length === 0) {
                inner = this.table;
            } else {
                const lastButton = isCustomer
                        ? <Button data-sort="seller">Sort by seller rating</Button>
                        : <span></span>,
                    buttons = [
                        <Button key={0} data-sort="price">Sort by price</Button>,
                        <Button key={1} data-sort="quantity">Sort by quantity left</Button>,
                    ];


                inner = (<React.Fragment>
                    <ButtonGroup>
                        {buttons}
                        {lastButton}
                    </ButtonGroup>
                    {this.table}
                </React.Fragment>);
            }
        } else { inner = (<div>Loading...</div>); }

        const wrapper = <MDBContainer>
            <MDBRow>
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

        this.type = PRODUCT_STATUS_REV.WAITING;
    }
}

class DispatchReadyProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.type = PRODUCT_STATUS_REV.PLACED;
    }
}

class DispatchedProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.type = PRODUCT_STATUS_REV.DISPATCHED;
    }
}

class CancelledProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.type = PRODUCT_STATUS_REV.CANCELLED;
    }
}

class OrderList extends GeneralProductList {
    constructor(props) {
        super(props);
        this.type = 42; // distinct from others
    }

    componentDidMount() {
        getOrders((orders) => {
            if (isValid(orders)) {
                orders = filterFields(orders);

                this.setState({ products: orders });
            } else {
                // TODO
                console.log(orders);
            }
        });
    }
}


export {
    WaitingProducts, DispatchedProducts, DispatchReadyProducts, CancelledProducts, OrderList,
};
