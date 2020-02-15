import React, { Component } from "react";
import {
    Button, Form, FormGroup, Label, Input,
} from "reactstrap";
import axios from "axios";
import { isVendor } from "../../config/data";
// import PropTypes from "prop-types";

class CreateModal extends Component {
    onSubmit() {
        axios.post();
    }

    render() {
        if (!isVendor) {
            return (<h1>Sorry, only vendors can create a product</h1>);
        }

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label><Input type="text" id="name" placeholder="My awesome product" />Name of product</Label>
                </FormGroup>
                <FormGroup>
                    <Label><Input type="number" id="price" placeholder="100" />Price of product</Label>
                </FormGroup>
                <FormGroup>
                    <Label><Input type="number" id="quantity" placeholder="1" />Quantity of product</Label>
                </FormGroup>
                <Button>Create product</Button>
            </Form>
        );
    }
}

CreateModal.propTypes = {

};


export default CreateModal;
