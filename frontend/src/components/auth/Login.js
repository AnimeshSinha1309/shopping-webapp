// from https://mdbootstrap.com/docs/jquery/modals/forms/

import React, { Component } from "react";
import PropTypes from "prop-types";

class Textbox extends Component {
    render() {
        const cls = `md-form form-sm ${this.props.cls}`,
            icon = (this.props.type === "password" ? "envelope" : "lock");

        return (
            <div className={cls}>
                <i className={`fas fa-${icon} prefix`}></i>
                <input onChange={this.props.onChange} type={this.props.type} id={this.props.uid} className="form-control form-control-sm validate" />
                <label data-error="wrong" data-success="right" htmlFor={this.props.uid}>Your {this.props.type}</label>
            </div>
        );
    }
}

class Password extends Component {
    render() {
        return (<Textbox cls="mb-4" type="password" {...this.props}></Textbox>);
    }
}

class Email extends Component {
    render() {
        return (<Textbox cls="mb-5" type="email" {...this.props}></Textbox>);
    }
}

Textbox.propTypes = {
    uid: PropTypes.string,
    type: PropTypes.string,
    cls: PropTypes.string,
    onChange: PropTypes.func,
};


class Modal extends Component {
    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        console.log(newUser);
    }

    render() {
        return (
            <div className="modal-dialog cascading-modal" role="document">
                <div className="modal-content">

                    <div className="modal-c-tabs"> {/* cascading tabs */}

                        <ul className="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#panel7" role="tab"><i className="fas fa-user mr-1"></i>
                      Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#panel8" role="tab"><i className="fas fa-user-plus mr-1"></i>
                      Register</a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane fade in show active" id="panel7" role="tabpanel">

                                <div className="modal-body mb-1">
                                    <Email uid="modalLRInput10" onChange={this.onChange.bind(this)} ></Email>
                                    <Password uid="modalLRInput11" onChange={this.onChange.bind(this)}></Password>

                                    <div className="text-center mt-2">
                                        <button className="btn btn-info" onSubmit={this.onSubmit}>Log in <i className="fas fa-sign-in ml-1"></i></button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="options text-center text-md-right mt-1">
                                        <p>Not a member? <a href="#" className="blue-text">Sign Up</a></p>
                                        <p>Forgot <a href="#" className="blue-text">Password?</a></p>
                                    </div>
                                </div>

                            </div>

                            <div className="tab-pane fade" id="panel8" role="tabpanel">
                                <div className="modal-body">
                                    <Email uid="modalLRInput12" onChange={this.onChange.bind(this)}></Email>
                                    <Password uid="modalLRInput13" onChange={this.onChange.bind(this)}></Password>

                                    <div className="md-form form-sm mb-4">
                                        <i className="fas fa-lock prefix"></i>
                                        <input type="password" id="modalLRInput14" onChange={this.onChange.bind(this)} className="form-control form-control-sm validate" />
                                        <label data-error="wrong" data-success="right" htmlFor="modalLRInput14">Repeat password</label>
                                    </div>

                                    <div className="text-center form-sm mt-2">
                                        <button className="btn btn-info">Sign up <i className="fas fa-sign-in ml-1" onSubmit={this.onSubmit}></i></button>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <div className="options text-right">
                                        <p className="pt-1">Already have an account? <a href="#" className="blue-text">Log In</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


export default Modal;
