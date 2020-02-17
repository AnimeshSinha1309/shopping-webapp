import React, { Component } from "react";
import { Input, Form, Button } from "reactstrap";
import { searchProduct } from "../actions/searchActions";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { filterFields } from "../utils/helper";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { productlist: [] };
    }

    onOrderClick() {
    }

    onQuery(e) {
        e.preventDefault();

        const elm = document.getElementById("searchquery");

        searchProduct(elm.value, (productlist) => {
            productlist = filterFields(productlist, []);
            const table = makeTableFromObjectArray(productlist, this.onOrderClick.bind(this), "Order");

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
