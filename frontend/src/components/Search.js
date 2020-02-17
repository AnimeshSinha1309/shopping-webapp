import React, { Component } from "react";
import { Input, Form, Button } from "reactstrap";
import { searchProduct, orderProduct } from "../actions/orderActions";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { filterFields } from "../utils/helper";


class Search extends Component {
    constructor(props) {
        super(props);
        this.buttonName = "Order";
        this.state = { productlist: [] };
    }

    /**
     * @param {Event} event
     */
    onOrderClick(event) {
        const node = event.target;
        if (node.tagName === "BUTTON" && node.innerHTML === this.buttonName) {
            const tr = node.parentElement.parentElement,
                { id } = tr.dataset,
                min = 1,
                max = 100; // TODO: from quantity rem

            while (true) {
                const input = window.prompt(`Enter quantity between ${min} and ${max}`);
                if (input === null) { break; }
                const quantity = Number(input);

                if (quantity >= min && quantity <= max) {
                    orderProduct(id, quantity, () => {
                        window.location.href = "/view-orders";
                    });
                    break;
                }
            }
        }
    }

    onQuery(e) {
        e.preventDefault();

        const elm = document.getElementById("searchquery");

        searchProduct(elm.value, (productlist) => {
            productlist = filterFields(productlist);
            const table = makeTableFromObjectArray(productlist, this.onOrderClick.bind(this), this.buttonName);

            this.setState({ productlist: table });
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onQuery.bind(this)}>
                    <Input type="text" placeholder="Enter seach query" id="searchquery"></Input>
                    <Button type="submit">Search</Button>
                </Form>
                <div>
                    {this.state.productlist}
                </div>
            </div>
        );
    }
}


export { Search };
