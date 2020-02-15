import React, { Component } from "react";
import { isVendor } from "./config/data";
// import PropTypes from "prop-types";

class CreateModal extends Component {
    render() {
        if (!isVendor) {
            return (<h1>Sorry, only vendors can create a product</h1>);
        }

        return (
            <form>
                <div className="md-form form-group mt-5">
                    <input type="text" id="name" className="form-control" />
                    <label htmlFor="name">Name of product</label>
                </div>
                <div className="md-form form-group mt-5">
                    <input type="number" id="price" className="form-control" />
                    <label htmlFor="name">Price of bundle</label>
                </div>
                <div className="md-form form-group mt-5">
                    <input type="number" id="quantity" className="form-control" />
                    <label htmlFor="name">Quantity of bundle</label>
                </div>

                <button className="btn btn-primary" type="submit">Create product</button>
            </form>
        );
    }
}

CreateModal.propTypes = {

};


export default CreateModal;
