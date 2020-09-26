import React, { Component } from 'react';
import { Button, Alert, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import FacebookLogin from 'react-facebook-login'
import fire from "./fire.js";
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            variant: "",
            isregister: false,
            error: false,
            email: "",
            password: "",
            name: "",
            user: null,
            fire: null,

            //error handel
            uEmail: "",
            uPWD: "",

            remil: "",
            rpwd: "",
            ruser: "",
            show: false,
        }
    }

    login() {
        if (this.state.email.trim() !== "" && this.state.password !== "") {
            fire.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password).then((result) => {
                localStorage.setItem("login", result.user);
                localStorage.setItem("name", result.user.email);
                localStorage.setItem("email", result.user.email);
                this.setState({ fire: "YES" })
                window.location.href = "/";
                this.props.closePopup();
            }).catch((err) => {
                this.setState({ msg: "Invalid login", variant: "danger" });
                this.setState({ error: !this.state.error });
            })
        }
        else if (this.state.email.trim().length === 0) {
            this.setState({ uEmail: "Email can't be blank" });
        }
        else if (this.state.password.trim().length === 0) {
            this.setState({ uPWD: "Password can't be blank" });
        }
        else {
            localStorage.setItem("login", false);
            this.setState({ msg: "New to Real8?", variant: "primary" });
            this.setState({ error: !this.state.error });
        }
        //this.postLogin();
    }

    register() {
        if (this.state.name.trim().length === 0) {
            this.setState({ ruser: "User can't be blank" });
        }
        else if (this.state.email.trim().length === 0) {
            this.setState({ remil: "Email can't be blank" });
        }
        else if (this.state.password.trim().length === 0) {
            this.setState({ rpwd: "Password can't be blank" });
        }
        else {
            this.props.closePopup()

            fire.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password).then((result) => {
                this.setState({ fire: "YES" })

                var user = fire.auth().currentUser;
                user.sendEmailVerification().then(function () {
                    console.warn("please check mail to verify");
                }).catch(function (error) {
                    console.warn("mail not sent");
                });

                localStorage.setItem("login", result.user);
                localStorage.setItem("name", result.user.email);
                localStorage.setItem("email", result.user.email);
                window.location.href = "/";
                this.props.closePopup();
            }).catch((err) => {
                this.setState({ msg: "Unable to Sign Up", variant: "danger" });
                this.setState({ error: !this.state.error });
            })
        }
    }

    HandelModel() {
        this.props.closePopup();
    }

    //code for fb
    componentClicked = () => {
        console.log(localStorage.getItem("login"));
    }

    componentDidMount() {
        this.props.term === "login" ?
            this.setState({ show: false })
            : this.setState({ show: true })


        if (this.state.fire === "YES") {
            fire.auth().onAuthStateChanged(user => {
                // if (!user) {
                //     window.location.href = "/";
                // } else {
                //     this.setState({ user });
                // }
            });
        }
        else {
            this.setState({ fire: null })
        }
    }

    responseFacebook = (res) => {
        if (res.status !== "unknown") {
            localStorage.setItem("name", res.name);
            localStorage.setItem("email", res.email);
            localStorage.setItem("login", res);
            window.location.href = "/";
        }
    }
    //end code for fb
    render() {
        return (
            <Modal centered show="true" onHide={() => this.HandelModel()}>
                <Modal.Header closeButton>
                    {
                        !this.state.isregister ? "Sign in" : "Create an account"
                    }
                </Modal.Header>
                <Modal.Body>
                    <Alert variant={this.state.variant} show={this.state.error}>
                        {this.state.msg}
                    </Alert>

                    {
                        this.props.term === "login" ?
                            <div>
                                <div>
                                    To protect your safety and the safety of the community you need to continue with an account (learn more). By continuing, you agree to our Community Guidelines, Terms and Privacy Policy.
                                </div><br />
                            </div>
                            :
                            null
                    }

                    <FacebookLogin
                        appId="741321949772640"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        cssClass="roundButton btnfb btn-block"
                        icon={<FontAwesomeIcon icon={faFacebookSquare} />}
                        textButton="&nbsp;&nbsp;Continue with Facebook"
                    />
                    <br />

                    <Button className="roundButton btn btn-block" size="lg" block onClick={() => this.setState({ show: true })}>Continue with email</Button>
                    <br />

                    {
                        this.state.show ?
                            !this.state.isregister ?
                                <div>
                                    <input type='text' className="form-control" placeholder="Email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    <span className="spanError">{this.state.uEmail}</span><br />

                                    <input type='password' className="form-control" placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    <span className="spanError">{this.state.uPWD}</span><br />

                                    <Button variant="secondary" onClick={() => this.login()}>Sign In</Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to="/Recoverpwd" onClick={() => this.HandelModel()}>Forgot your password?</Link>
                                    <br />

                                    <span>New to Real 8?</span>&nbsp;&nbsp;
                                    <Button variant="secondary" onClick={() => this.setState({ isregister: true, error: false })}>Create Account</Button>
                                </div>
                                :
                                <div>
                                    <input type='text' className="form-control" placeholder="Name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                    <span className="spanError">{this.state.ruser}</span><br />

                                    <input type='text' className="form-control" placeholder="Email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    <span className="spanError">{this.state.remil}</span><br />

                                    <input type='password' className="form-control" placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    <span className="spanError">{this.state.rpwd}</span><br />

                                    <Button variant="secondary" onClick={() => this.register()}>Create Account</Button><br />

                                    <span>Already have an account?</span>&nbsp;&nbsp;
                                    <Button variant="secondary" onClick={() => this.setState({ isregister: false, error: false })}>Sign In</Button>
                                </div>

                            : null
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

export default Login;