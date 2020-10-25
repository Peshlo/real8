import { Container, Button, Alert } from 'react-bootstrap'
import React, { Component } from 'react';
import {fire} from './fire.js'

class UserAccount extends Component {
    constructor() {
        super();
        this.state = {
            changePassword: false,
            curPwd: "",
            crPwdError: "",
            newPwd: "",
            newPwdError: "",
            msg: "",
            variant: "",
            error: false,
            dltAccount: false,
            user: fire.auth().currentUser
            //working:false
        }
    }

    componentDidMount(){
        fire.auth().onAuthStateChanged(user => {
        if (user) {
            this.setState({ user });
        }})
    }

    changePassword() {
        if (this.state.curPwd.trim().length < 8) {
            this.setState({ crPwdError: "Current password can't be blank or less than 8 characters", newPwdError: "" });
        }
        else if (this.state.newPwd.trim().length < 8) {
            this.setState({ newPwdError: "New password can't be blank or less than 8 characters", crPwdError: "" });
        }
        else if (this.state.newPwd.trim() === this.state.curPwd.trim()) {
            this.setState({ msg: "Password must not be same", variant: "danger", error: !this.state.error })
        }
        else {
            if (this.state.newPwd.trim()!=="") {
                //this.setState({ working: true });
                fire.auth().currentUser.updatePassword(this.state.newPwd.trim()).then(() => {
                    this.setState({ msg: "Password Changed Successfully", variant: "success", error: !this.state.error, newPwdError: "", crPwdError: "" })
                }, error => {
                    this.setState({ msg: error.message,variant: "danger", error: !this.state.error, newPwdError: "", crPwdError: "" });
                });
            }            
            //this.setState({ msg: "Under process", variant: "primary", error: !this.state.error, newPwdError: "", crPwdError: "", })
        }
    }

    deleteAccount() {
        if (this.state.curPwd.trim().length < 8) {
            this.setState({ crPwdError: "Current password can't be blank or less than 8 characters", newPwdError: "" })
        }
        else {
            var user = fire.auth().currentUser;
            user.delete().then(function () {
                localStorage.clear();
                window.location.href = "/";
            }).catch(function (error) {
                this.setState({ msg: "Under process", variant: "danger", error: !this.state.error, newPwdError: "", crPwdError: "", })
            });
        }
    }

    render() {
        return (
            <div className="container">
                <Container>
                    {
                        !this.state.dltAccount ?
                            !this.state.changePassword ?
                                <table width="50%">
                                    <thead>
                                        <tr>
                                            <th colsapn="2" className="fltright">
                                                <h1 className="pb-3">Account</h1>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{localStorage.getItem("email")}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <br /><br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{localStorage.getItem("name")}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <br /><br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Password:</td>
                                            <td>
                                                (hidden)&nbsp;&nbsp;
                                <Button className="roundButton" variant="outline-secondary" onClick={() => this.setState({ changePassword: true })} >
                                                    Change
                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <br /><br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <Button className="roundButton" variant="outline-secondary" onClick={() => this.setState({ dltAccount: true })}>
                                                    Delete Account
                                        </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                :
                                <div>
                                    <h1>Change Password</h1><br />
                                    <Alert variant={this.state.variant} show={this.state.error}>
                                        {this.state.msg}
                                    </Alert>
                                    <span>Current password</span><br />
                                    <input className="form-control" type="password" placeholder="8 or more characters" onChange={(e) => this.setState({ curPwd: e.target.value })} />
                                    <span className="spanError">{this.state.crPwdError}</span><br /><br />

                                    <span>New password</span><br />
                                    <input className="form-control" type="password" placeholder="8 or more characters" onChange={(e) => this.setState({ newPwd: e.target.value })} />
                                    <span className="spanError">{this.state.newPwdError}</span><br /><br />

                                    <Button variant="secondary" className="roundButton" onClick={() => this.changePassword()} >Change password</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" className="roundButton" onClick={() => this.setState({ changePassword: false, msg: "", error: !this.state.error })}>Cancel</Button>
                                </div>
                            :
                            <div>
                                <h1>Delete your Real8 account</h1><br />
                                <Alert variant={this.state.variant} show={this.state.error}>
                                    {this.state.msg}
                                </Alert>
                                <span>Are you sure? Your account information will be deleted from our site.</span><br /><br />
                                <span>Password</span><br />
                                <input className="form-control" type="password" placeholder="8 or more characters" onChange={(e) => this.setState({ curPwd: e.target.value })} />
                                <span className="spanError">{this.state.crPwdError}</span><br /><br />
                                <br />
                                <Button variant="secondary" className="roundButton" onClick={() => this.deleteAccount()} >Delete account</Button>&nbsp;&nbsp;&nbsp;&nbsp;

                                <Button variant="outline-secondary" className="roundButton" onClick={() => this.setState({ dltAccount: false, msg: "", error: !this.state.error })}>No I've changed my mind.</Button>
                            </div>
                    }
                </Container>
            </div>
        );
    }
}

export default UserAccount;