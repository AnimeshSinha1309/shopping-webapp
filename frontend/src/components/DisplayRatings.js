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
        };
    }

    componentDidMount() {
        if (window.location.search) {
            try {
                if (this.props.vendor) {
                    const vendor = window.location.search.match(/vendor=(.+)/)[1];

                    getData(`${endpoint}/vendors/review`, { vendor }).then((reviews) => {
                        if (reviews.data.length > 0) {
                            this.setState({ reviews: makeTableFromObjectArray(filterFields(reviews.data, ["vendor", "customer"])) });
                        } else {
                            this.setState({ reviews: <h3>No ratings found</h3> });
                        }
                    });
                } else if (this.props.product) {
                    const product = window.location.search.match(/product=(.+)/)[1];

                    getData(`${endpoint}/vendors/review-product`, { product }).then((reviews) => {
                        if (reviews.data.length > 0) {
                            this.setState({ reviews: makeTableFromObjectArray(filterFields(reviews.data, ["product", "customer"])) });
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
                            <h1> {this.props.vendor ? "Vendor" : "Product"} reviews</h1>
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
