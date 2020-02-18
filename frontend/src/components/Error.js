import React, { Component } from "react";
import PropTypes from "prop-types";
import { MDBCol, MDBRow, MDBContainer } from "mdbreact";

class ErrorComp extends Component {
    render() {
        const errorObj = this.props.errors,
            errorList = [],
            errors = Object.keys(errorObj);

        for (const error of errors) {
            errorList.push(<span className="text-danger">{error}: {errorObj[error]}</span>);
        }

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12">
                        {errorList}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

ErrorComp.propTypes = {
    errors: PropTypes.objectOf(PropTypes.string),
};

export { ErrorComp };
