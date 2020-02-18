import React, { Component } from "react";
import PropTypes from "prop-types";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";

class ErrorComp extends Component {
    render() {
        let { errors } = this.props;

        errors = errors.map((error, idx) => <p className="text-danger" key={idx}>{error}</p>);

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12">
                        {errors}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

ErrorComp.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
};

export { ErrorComp };
