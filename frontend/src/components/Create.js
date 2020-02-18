import React, { Component } from "react";
import {
    Button, Form, FormGroup, Label, Input,
} from "reactstrap";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";

import PropTypes from "prop-types";
import { createProduct } from "../actions/productActions";
import { isValid } from "../../../backend/utils/errors";

class CreateModal extends Component {
    onChange(e) {
        if (e.target.id === "imagePath") {
            const fr = new FileReader();
            fr.onload = function () {
                this.setState({ imageData: fr.result });
            }.bind(this);
            fr.readAsDataURL(e.target.files[0]);
        } else { this.setState({ [e.target.id]: e.target.value }); }
    }

    onSubmit(e) {
        e.preventDefault();
        const copyFields = ["name", "price", "quantity", "quantityRem", "imageData"],
            data = {};

        for (const field of copyFields) { data[field] = this.state[field]; }

        createProduct(data, (errors) => {
            if (isValid(errors)) {
                this.props.history.push("/view-waiting");
            } else {
                // TODO
            }
        });
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12">
                        <h1>Create a new product!</h1>
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
                            <FormGroup>
                                <Label>
                            Product image (optional) <i>Please add image &lt;100kB till I figure a way out around express limits</i>
                                    <Input onChange={this.onChange.bind(this)} type="file" id="imagePath" accept=".png,.jpg" />
                                </Label>
                            </FormGroup>
                            <Button>Create product</Button>
                        </Form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

CreateModal.propTypes = {
    history: PropTypes.objectOf(PropTypes.any),
};


export default CreateModal;
