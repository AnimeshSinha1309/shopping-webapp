import React, { Component } from "react";
import "./App.css";
import Modal from "./Login";
import CreateModal from "./Create";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <p className="App-intro">;{this.state.apiResponse}</p>

                <Modal></Modal>
                <CreateModal></CreateModal>
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
        this.callAPI();
    }
}

export default App;
