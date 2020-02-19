import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
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
            const vendor = window.location.search.match(/vendor=(.+)/)[1];
            console.log(vendor);


            getData(`${endpoint}/vendors/review`, { vendor }).then((reviews) => {
                if (reviews.data.length > 0) {
                    this.setState({ reviews: makeTableFromObjectArray(filterFields(reviews.data, ["vendor", "customer"])) });
                } else {
                    this.setState({ reviews: <h1>No ratings found</h1> });
                }
            });
        } else {
            this.setState({ reviews: <h1>No vendor given</h1> });
        }
    }

    render() {
        if (this.state.reviews) {
            return (
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="8">
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

export { DisplayRating };
