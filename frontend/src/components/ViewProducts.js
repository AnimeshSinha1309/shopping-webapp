import React, { Component } from "react";
import PropTypes from "prop-types";
import { getProductList, dispatchProduct } from "../actions/productActions";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { PRODUCT_STATUS_REV } from "../config/settings";

class GeneralProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: null,
        };
    }

    /**
     *
     * @param {Event} ev click handler event
     */
    onClick(ev) {
        const node = ev.target;

        if (node.tagName === "BUTTON" && node.innerHTML === "Dispatch") {
            const tr = node.parentElement.parentElement,
                { id, name } = tr.dataset;

            if (window.confirm(`Are you sure you want to dispatch ${name}?`)) {
                dispatchProduct(id, () => {
                    this.props.history.push("/view-dispatched");
                });
            }
        }
    }

    componentDidMount() {
        // TODO:
        // const filterBtn = <input type="checkbox" value="filter-ready" />;

        getProductList(this.state.type, (products) => {
            const btnText = this.state.type === 1 ? "Dispatch" : "";

            this.setState({ table: makeTableFromObjectArray(products, this.onClick.bind(this), btnText) });
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

GeneralProductList.propTypes = {
    history: PropTypes.objectOf(PropTypes.any),
};

class WaitingProducts extends GeneralProductList {
    constructor(props) {
        super(props);

        this.state.type = PRODUCT_STATUS_REV.WAITING;
    }
}

class DispatchReadyProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.state.type = PRODUCT_STATUS_REV.PLACED;
    }
}

class DispatchedProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.state.type = PRODUCT_STATUS_REV.DISPATCHED;
    }
}

class CancelledProducts extends GeneralProductList {
    constructor(props) {
        super(props);
        this.state.type = PRODUCT_STATUS_REV.CANCELLED;
    }
}

export {
    WaitingProducts, DispatchedProducts, DispatchReadyProducts, CancelledProducts,
};
