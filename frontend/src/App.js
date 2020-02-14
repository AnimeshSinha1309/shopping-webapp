import React, { Component } from "react";
import "./App.css";


class App extends Component {
    render() {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/api")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    componentDidMount() {
        // this.callAPI();
    }
}

export default App;
