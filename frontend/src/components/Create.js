import React, { Component } from "react";
import {
    Button, Form, FormGroup, Label, Input,
} from "reactstrap";

import PropTypes from "prop-types";
import { createProduct } from "../actions/productActions";

class CreateModal extends Component {
    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
            quantityRem: this.state.quantity,
        };

        createProduct(data, () => {
            this.props.history.push("/view-placed");
        });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit.bind(this)} >
                <FormGroup>
                    <Label>Name of product<Input onChange={this.onChange.bind(this)} type="text" id="name" /></Label>
                </FormGroup>
                <FormGroup>
                    <Label>Price of product<Input onChange={this.onChange.bind(this)} type="number" id="price" /></Label>
                </FormGroup>
                <FormGroup>
                    <Label>Quantity of product<Input onChange={this.onChange.bind(this)} type="number" id="quantity" min={1} max={1000} /></Label>
                </FormGroup>
                <Button>Create product</Button>
            </Form>
        );
    }
}

CreateModal.propTypes = {
    history: PropTypes.objectOf(PropTypes.any),
};


export default CreateModal;
