import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import { getData } from "../actions/generalGetSet";
import { endpoint } from "../config/settings";
import { makeTableFromObjectArray } from "../utils/makeTable";
import { filterFields } from "../utils/helper";

class DisplayRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            name: "",
        };
    }

    componentDidMount() {
        if (window.location.search) {
            try {
                if (this.props.vendor) {
                    const vendor = window.location.search.match(/vendor=(.+)/)[1];

                    getData(`${endpoint}/vendors/review`, { vendor }).then(({ data }) => {
                        const { reviews, vendid: vendorName } = data;

                        this.setState({ name: vendorName });
                        if (reviews.length > 0) {
                            this.setState({ reviews: makeTableFromObjectArray(filterFields(reviews, ["vendor", "customer"])) });
                        } else {
                            this.setState({ reviews: <h3>No ratings found</h3> });
                        }
                    });
                } else if (this.props.product) {
                    const product = window.location.search.match(/product=(.+)/)[1];

                    getData(`${endpoint}/vendors/review-product`, { product }).then(({ data }) => {
                        const { reviews, prodid: vendorName } = data;

                        this.setState({ name: vendorName });

                        if (reviews.length > 0) {
                            this.setState({ reviews: makeTableFromObjectArray(filterFields(reviews, ["product", "customer"])) });
                        } else {
                            this.setState({ reviews: <h3>No ratings found</h3> });
                        }
                    });
                }

                return;
            } catch (e) {
                // nothing
            }
        }

        this.setState({ reviews: <h3>No {this.props.vendor ? "vendor" : "product"} given</h3> });
    }

    render() {
        if (this.state.reviews) {
            return (
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="8">
                            <h1> {this.props.vendor ? "Vendor" : "Product"} {this.state.name} reviews</h1>
                            {this.state.reviews}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>);
        }
        return (
            <div>
            Loading...
            </div>
        );
    }
}

DisplayRating.propTypes = {
    product: PropTypes.bool,
    vendor: PropTypes.bool,
};

export { DisplayRating };
