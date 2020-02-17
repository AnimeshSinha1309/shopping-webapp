import React, { Component } from "react";
import { getOrders } from "../actions/orderActions";
import { filterFields } from "../utils/helper";
import { makeTableFromObjectArray } from "../utils/makeTable";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: null,
        };
        this.buttonName = "Cancel";
    }


    /**
     * @param {Event} ev click handler event
     */
    onClick(ev) {
        const node = ev.target;

        if (node.tagName === "BUTTON" && node.innerHTML === this.buttonName) {
            console.log("TODO");
        }
    }

    componentDidMount() {
        getOrders((orders) => {
            orders = filterFields(orders);

            this.setState({ table: makeTableFromObjectArray(orders, this.onClick.bind(this), this.buttonName) });
        });
    }

    render() {
        if (this.state.table) {
            return this.state.table;
        }

        return <div>Loading...</div>;
    }
}

export { OrderList };
