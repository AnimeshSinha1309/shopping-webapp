import React, { Component } from "react";
import PropTypes from "prop-types";

import { currentUserObj } from "../../config/data";
import { USER_TYPE_REV } from "../../config/settings";

class Welcome extends Component {
    render() {
        return (<h1>Hi { currentUserObj.name }, you are a { USER_TYPE_REV[currentUserObj.usertype] }</h1>);
    }
}

Welcome.propTypes = {
    currentUser: PropTypes.string,
    usertype: PropTypes.string,
};

export { Welcome };
