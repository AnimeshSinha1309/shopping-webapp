import React, { Component } from "react";
// import PropTypes from "prop-types";

class Search extends Component {
    render() {
        return (
            <form>
                <div className="md-form form-group mt-5">
                    <input type="text" id="name" className="form-control" />
                    <label htmlFor="name">Search string</label>
                </div>

                <button className="btn btn-primary" type="button">Search product</button>
            </form>
        );
    }
}

Search.propTypes = {

};


export default Search;
