// from https://mdbootstrap.com/docs/jquery/modals/forms/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { registerUser, loginUser } from "../actions/authActions";
import { USER_TYPE } from "../config/settings";
import "./Login.css";
import { ErrorComp } from "./Error";

class Textbox extends Component {
    render() {
        const cls = `md-form form-sm ${this.props.cls}`,
            icon = (this.props.type === "password" ? "envelope" : "lock");

        return (
            <div className={cls}>
                <i className={`fas fa-${icon} prefix`}></i>
                <input data-type={this.props.datatype} onChange={this.props.onChange} type={this.props.type} id={this.props.uid} className="form-control form-control-sm validate" />
                <label htmlFor={this.props.uid}>Your {this.props.datatype}</label>
            </div>
        );
    }
}

Textbox.propTypes = {
    uid: PropTypes.string,
    type: PropTypes.string,
    cls: PropTypes.string,
    onChange: PropTypes.func,
    datatype: PropTypes.string,
};

class Password extends Component {
    render() {
        return (<Textbox cls="mb-4" type="password" datatype="password" {...this.props}></Textbox>);
    }
}

class Email extends Component {
    render() {
        return (<Textbox cls="mb-4" type="email" datatype="email" {...this.props}></Textbox>);
    }
}

class Name extends Component {
    render() {
        return (<Textbox cls="mb-5" type="text" datatype="name" {...this.props}></Textbox>);
    }
}

class Radio extends Component {
    render() {
        return (
            <div className="md-form form-sm mb-4 radio-input-container">
                <i className="fas fa-user-friends prefix"></i>
                <div>
                    <label><input data-type="usertype" type="radio" value={USER_TYPE.vendor} name="type" onClick={this.props.onChangeHandler} className="validate" />Vendor</label>
                </div>
                <div>
                    <label><input data-type="usertype" type="radio" value={USER_TYPE.customer} name="type" onClick={this.props.onChangeHandler} className="validate" />Customer</label>
                </div>
            </div>
        );
    }
}

Radio.propTypes = {
    onChangeHandler: PropTypes.func,
};

class Modal extends Component {
    /**
     * @param {*} props
     * @param {Boolean} isRegister
     */
    constructor(props, isRegister) {
        super(props);
        this.state = { errors: [] };

        const onChangeHandler = this.onChange.bind(this);

        if (isRegister) {
            this.inner = (
                <React.Fragment>
                    <Name onChange={onChangeHandler} ></Name>
                    <Email onChange={onChangeHandler}></Email>
                    <Password onChange={onChangeHandler}></Password>

                    <div className="md-form form-sm mb-4">
                        <i className="fas fa-lock prefix"></i>
                        <input data-type="password2" type="password" id="confirmPasswordInp" onChange={onChangeHandler} className="form-control form-control-sm validate" />
                        <label htmlFor="confirmPasswordInp">Repeat password</label>
                    </div>

                    <Radio onChangeHandler={onChangeHandler}></Radio>

                    <div className="text-center form-sm mt-2">
                        <button className="btn btn-info">Sign up <i className="fas fa-sign-in ml-1"></i></button>
                    </div>

                    <div>
                        Been here before? <b><Link to="/login">Log in</Link></b> instead
                    </div>
                </React.Fragment>
            );
        } else {
            this.inner = (
                <React.Fragment>
                    <Email uid="email" onChange={onChangeHandler} ></Email>
                    <Password uid="password" onChange={onChangeHandler}></Password>
                    <div className="text-center mt-2">
                        <button className="btn btn-info">Log in <i className="fas fa-sign-in ml-1"></i></button>
                    </div>
                    <div>
                        First time? <b><Link to="/register">Register</Link></b> instead
                    </div>
                </React.Fragment>
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.dataset.type]: e.target.value });
    }

    submitCallback(status = {}) {
        if (status.isValid === false) {
            this.setState({ errors: status.errors });
        } else {
            window.location.reload();
        }
    }

    render() {
        const submitHandler = this.onSubmit.bind(this);
        return (
            <MDBContainer>
                <MDBRow className="center">
                    <MDBCol size="8" className="mx-auto">
                        <form onSubmit={submitHandler}>{this.inner}
                        </form>
                        <ErrorComp errors={this.state.errors}></ErrorComp>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

class Login extends Modal {
    constructor(props) {
        super(props, false);
    }

    onSubmit(e) {
        e.preventDefault();
        const userCreds = {
            email: this.state.email,
            password: this.state.password,
        };

        loginUser(userCreds, this.submitCallback.bind(this));
    }
}

class Register extends Modal {
    constructor(props) {
        super(props, true);
    }

    onSubmit(e) {
        e.preventDefault();

        const fields = ["name", "email", "password", "password2", "usertype"],
            newUser = {};

        for (const field of fields) {
            newUser[field] = this.state[field];
        }

        registerUser(newUser, this.submitCallback.bind(this));
    }
}

export { Login, Register };
