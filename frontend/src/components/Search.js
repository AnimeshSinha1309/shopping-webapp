import React, { Component } from "react";
import { Input, Form } from "reactstrap";

class Search extends Component {
    onQuery(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onQuery.bind(this)}>
                    <Input type="text" placeholder="Enter seach query"></Input>
                </Form>
                <div>
                    Search results are empty!
                </div>
            </div>
        );
    }
}

export { Search };
