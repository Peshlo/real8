import React, { Component } from 'react';
import { Button, Alert, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faFacebook, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import FacebookLogin from 'react-facebook-login'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            auth: false,
            variant: "",
            isregister: false,
            error: false,
            email: "",
            password: "",
            name: "",

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
        if (this.state.email.trim() != "" && this.state.password != "") {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = "http://203.112.144.172/API/api/Values/GetUserEmailPass?email=" + this.state.email + "&password=" + this.state.password;
            fetch(proxyurl + url).then((res) => {
                res.json().then((result) => {
                    if (result) {
                        localStorage.setItem("login", JSON.parse(result));
                        localStorage.setItem("name", JSON.parse(result)[0].UserName);
                        localStorage.setItem("email", JSON.parse(result)[0].EmailID);
                        window.location.href = "/";
                        this.props.closePopup();
                    }
                    else {
                        console.warn("error" + result);
                        this.setState({ msg: "unable to login", variant: "danger", error: !this.state.error })
                    }
                })
            }).catch(() => console.log("Can’t access api response. Blocked by browser?"))


            // fetch("http://localhost:3306/api/userLogin/Login", {
            //     method: "post",
            //     headers: {
            //         "content-type": "application/json"
            //     },
            //     body: JSON.stringify({ "email": this.state.email, "password": this.state.password })
            // }).then((res) => {
            //     res.json().then((result) => {
            //         if (result.response) {
            //             console.warn();
            //             localStorage.setItem("login", result.response[0]);
            //             localStorage.setItem("name", result.response[0].UserName);
            //             localStorage.setItem("email", result.response[0].EmailID);
            //             window.location.href = "/";
            //             this.props.closePopup();
            //         }
            //         else {
            //             console.warn("error" + result);
            //             this.setState({ msg: "unable to login", variant: "danger", error: !this.state.error })
            //         }
            //     })
            // }).catch(() => console.log("Can’t access api response. Blocked by browser?"))
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

            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = "http://203.112.144.172/API/api/Values/Post";

            fetch(proxyurl + url, {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ "name": this.state.name, "password": this.state.password, "email": this.state.email })
            }).then((res) => {
                res.json().then((result) => {
                    if (result) {
                        console.warn(result)
                        if (result === "1") {
                            fetch(proxyurl + "http://203.112.144.172/API/api/Values/GetUserEmailPass?email=" + this.state.email + "&password=" + this.state.password).then((res1) => {
                                res1.json().then((result1) => {
                                    if (result1) {
                                        console.warn(result1);
                                        localStorage.setItem("login", JSON.parse(result1));
                                        localStorage.setItem("name", JSON.parse(result1)[0].UserName);
                                        localStorage.setItem("email", JSON.parse(result1)[0].EmailID);
                                        window.location.href = "/";
                                        this.props.closePopup();
                                    }
                                    else {
                                        console.warn("error" + result1);
                                        this.setState({ msg: "unable to login", variant: "danger", error: !this.state.error })
                                    }
                                })
                            }).catch(() => console.log("Can’t access api response. Blocked by browser?"))
                        }
                    }
                    else {
                        this.setState({ msg: "unable to register", variant: "danger", error: !this.state.error })
                    }
                })
            }).catch(() => console.log("Can’t access api response. Blocked by browser?"))
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

                                    <Button variant="secondary" onClick={() => this.login()}>Sign In</Button><br />

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