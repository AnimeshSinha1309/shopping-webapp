import React, { Component } from "react";
import {
    Button, Form, FormGroup, Label, Input,
} from "reactstrap";

import { createProduct } from "../actions/productActions";
import { isVendor } from "../config/data";
// import PropTypes from "prop-types";

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

        createProduct(data, (res) => {
            console.log(res);
        });
    }

    render() {
        if (!isVendor) {
            return (<h1>Sorry, only vendors can create a product</h1>);
        }

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

};


export default CreateModal;
