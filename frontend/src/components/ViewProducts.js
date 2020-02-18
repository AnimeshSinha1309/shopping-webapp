import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Button } from "reactstrap";
import { getProductList, dispatchProduct } from "../actions/productActions";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { PRODUCT_STATUS_REV } from "../config/settings";

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
            if (node.innerHTML === "Dispatch") {
                const tr = node.parentElement.parentElement,
                    { id, name } = tr.dataset;

                if (window.confirm(`Are you sure you want to dispatch ${name}?`)) {
                    dispatchProduct(id, () => {
                        this.props.history.push("/view-dispatched");
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
            this.setState({ products });
        });
    }

    /**
     * Asynchronous render function
     */
    render() {
        if (this.state.products) {
            const btnText = this.type === 1 ? "Dispatch" : "";
            this.table = makeTableFromObjectArray(this.state.products, undefined, btnText);

            return (
                <div onClick={this.onClick.bind(this)}>
                    <ButtonGroup>
                        <Button data-sort="price">Sort by price</Button>
                        <Button data-sort="quantity">Sort by quantity left</Button>
                        <Button data-sort="seller">Sort by seller rating</Button>
                    </ButtonGroup>
                    {this.table}
                </div>
            );
        }

        return (<div>Loading...</div>);
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

export {
    WaitingProducts, DispatchedProducts, DispatchReadyProducts, CancelledProducts,
};
