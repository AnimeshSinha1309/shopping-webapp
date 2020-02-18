import React, { Component } from "react";
import {
    Button, Form, FormGroup, Label, Input,
} from "reactstrap";
import {
    MDBCol, MDBRow, MDBContainer, MDBInput,
} from "mdbreact";

import PropTypes from "prop-types";
import { createProduct } from "../actions/productActions";
import { isValid } from "../utils/errors";
import { ErrorComp } from "./Error";

class CreateModal extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
    }

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
                this.setState({ errors: errors.errors });
            }
        });
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="8" className="mx-auto">
                        <h1>Create a new product!</h1>
                        <Form onSubmit={this.onSubmit.bind(this)} >
                            <FormGroup>
                                <MDBInput
                                    onChange={this.onChange.bind(this)}
                                    type="text"
                                    id="name"
                                    label="Name of product"
                                ></MDBInput>
                            </FormGroup>
                            <FormGroup>
                                <MDBInput
                                    onChange={this.onChange.bind(this)}
                                    type="number"
                                    id="price"
                                    label="Price of product"
                                ></MDBInput>
                            </FormGroup>
                            <FormGroup>
                                <MDBInput
                                    onChange={this.onChange.bind(this)}
                                    type="number"
                                    id="quantity"
                                    label="Quantity of product"
                                    min={1} max={1000}
                                ></MDBInput>
                            </FormGroup>
                            <FormGroup>
                                <Label>
                            Product image (optional) <i>Please add image &lt;100kB till I figure a way out around express limits</i>
                                    <Input onChange={this.onChange.bind(this)} type="file" id="imagePath" accept=".png,.jpg" />
                                </Label>
                            </FormGroup>
                            <Button>Create product</Button>
                        </Form>
                        <ErrorComp errors={this.state.errors}></ErrorComp>
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
