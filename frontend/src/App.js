import React from "react";
import "./App.css";
import Modal from "./Login";
import CreateModal from "./Create";

function App() {
    return (
        <React.Fragment>
            <Modal></Modal>
            <CreateModal></CreateModal>
        </React.Fragment>
    );
}

export default App;
