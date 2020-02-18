import React, { Component } from "react";
import { Input, Form } from "reactstrap";
import PropTypes from "prop-types";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
import { searchProduct, orderProduct } from "../actions/orderActions";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { filterFields } from "../utils/helper";


class Search extends Component {
    constructor(props) {
        super(props);
        this.buttonName = "Order";
        this.state = { productlist: [] };

        setTimeout(this.onQuery.bind(this), 200);
    }

    /**
     * @param {Event} event
     */
    onOrderClick(event) {
        const node = event.target;
        if (node.tagName === "BUTTON" && node.innerHTML === this.buttonName) {
            const tr = node.parentElement.parentElement,
                { id } = tr.dataset,
                max = Number(tr.dataset.max),
                min = 1;

            while (true) {
                const input = window.prompt(`Enter quantity between ${min} and ${max}`);

                if (input === null) { break; }

                const quantity = Number(input);

                if (quantity >= min && quantity <= max) {
                    orderProduct(id, quantity, (errors) => {
                        if (errors.isValid === false) {
                            // TODO
                        } else {
                            this.props.history.push("/view-orders");
                        }
                    });
                    break;
                }
            }
        }
    }

    onQuery() {
        const elm = document.getElementById("searchquery");

        searchProduct(elm.value, (productlist) => {
            if (productlist.isValid === false) {
                // TODO
            } else {
                // confidence added by mongoose-fuzzy-search
                productlist = filterFields(productlist, ["confidenceScore"]);
                const table = makeTableFromObjectArray(productlist, this.onOrderClick.bind(this), this.buttonName);

                this.setState({ productlist: table });
            }
        });
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12">
                        <h1>Search for products on the marketplace!</h1>
                        <Form onSubmit={this.onQuery.bind(this)}>
                            <Input type="text" placeholder="Enter seach query" id="searchquery" onChange={this.onQuery.bind(this)} />
                        </Form>
                        <p><i>Search results sorted by closest match, uses fuzzy matching on product name</i></p>
                        <div>
                            {this.state.productlist}
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

Search.propTypes = {
    history: PropTypes.objectOf(PropTypes.any),
};

export { Search };
