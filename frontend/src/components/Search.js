import React, { Component } from "react";
import { Input, Form, Button } from "reactstrap";
import PropTypes from "prop-types";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";
import { searchProduct, orderProduct } from "../actions/orderActions";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { filterFields } from "../utils/helper";
import { isValid } from "../utils/errors";


class Search extends Component {
    constructor(props) {
        super(props);
        this.buttonName = "Order";
        this.state = { productlist: [] };

        setTimeout(this.searchProds.bind(this), 200);
    }

    /**
     * @param {Event} event
     */
    onClick(event) {
        const node = event.target;
        if (node.tagName === "BUTTON") {
            if (node.innerHTML === this.buttonName) {
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
                            if (isValid(errors)) {
                                this.props.history.push("/view-orders");
                            }
                        });
                        break;
                    }
                }
            } else if (node.dataset) {
                console.log(this.state, node.dataset);

                const copy = this.state.productlist.slice(0);

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

                this.setState({ productlist: copy });
            }
        }
    }

    searchProds() {
        const elm = document.getElementById("searchquery");

        searchProduct(elm.value, (productlist) => {
            if (isValid(productlist)) {
                // confidence added by mongoose-fuzzy-search
                productlist = filterFields(productlist, ["confidenceScore"]);

                this.setState({ productlist });
            }
        });
    }

    onQuery(e) {
        e.preventDefault();
        this.searchProds();
    }

    render() {
        const buttons = [
                <Button key={2} data-sort="seller">Sort by seller rating</Button>,
                <Button key={0} data-sort="price">Sort by price</Button>,
                <Button key={1} data-sort="quantity">Sort by quantity left</Button>,
            ],
            table = makeTableFromObjectArray(this.state.productlist, undefined, [this.buttonName]);

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12" onClick={this.onClick.bind(this)}>
                        <h1>Search for products on the marketplace!</h1>
                        <Form onSubmit={this.onQuery.bind(this)}>
                            <Input type="text" placeholder="Enter seach query" id="searchquery" onChange={this.onQuery.bind(this)} />
                        </Form>
                        <p>Only Waiting products not previously ordered by you are shown.
                            <i>Search results sorted by closest match, uses fuzzy matching on product name</i></p>
                        <div>
                            {buttons}
                        </div>
                        <div>
                            {table}
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
