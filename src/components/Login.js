import React, { Component } from 'react';
import { Button, Alert, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { fire, provider } from "./fire.js";
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

            //error handel
            uEmail: "",
            uPWD: "",

            remil: "",
            rpwd: "",
            ruser: "",
            show: false,
            showdiv: false,
        }
    }

    login() {
        if (this.state.email.trim() !== "" && this.state.password !== "") {
            fire.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password).then((result) => {
               

                this.checkUserEmailVerified(this,result);
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
     checkUserEmailVerified(context,result){
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
              if (user.emailVerified === false) {
                context.setState({ msg: "Email Not Verified!", variant: "danger" });
                context.setState({ error: !context.state.error });
                
              } else {
        
                // successful login 
         localStorage.setItem("login", result.user);
        localStorage.setItem("name", result.user.displayName);
        localStorage.setItem("email", result.user.email);
        context.setState({ fire: "YES" })
        window.location.href = "/";
        context.props.closePopup();
              }
            } else {
              //  Toast.show({ text: 'Something Wrong!', position: 'bottom', buttonText: 'No user is signed in.' }); 
            }
          });
       
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
            fire.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password).then((result) => {
                var user = fire.auth().currentUser;
                    user.updateProfile({
                        displayName: this.state.name.trim()
                    }).then(function () {
                    user.sendEmailVerification().then(function () {
                    this.setState({ fire: "YES", msg: "Sign up successful. Kindly check inbox and verify your email to continue.", showdiv: true, variant: "primary", error: !this.state.error })
                    }).catch(function (error) {});
                    }).catch(function (error) {});
                    this.setState({ fire: "YES", msg: "Sign up successful. Kindly check inbox and verify your email to continue.", showdiv: true, variant: "primary", error: !this.state.error })
                    this.setState({ name: "", email: "", password: "" })
            }).catch((er)=>{
                this.setState({ msg: ""+er.message, variant: "danger" });
                this.setState({ error: !this.state.error });
            })
        }
    }

    HandelModel() {
        this.props.closePopup();
    }

    handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.setState({
            itemvalues: [{}]
        });
        this.setState({ isregister: true, error: false })
    };

    handleResetsign = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.setState({
            itemvalues: [{}]
        });
        this.setState({ isregister: false, error: false })
    };

    componentDidMount() {
        this.props.term === "login" ?
            this.setState({ show: false })
            : this.setState({ show: true })


        fire.auth().onAuthStateChanged(user => {
        });
    }

    facebookLogin() {
        fire.auth().signInWithPopup(provider).then((result, error) => {
            if (error) {
                this.setState({ msg: error.message, variant: "danger" });
                this.setState({ error: !this.state.error });
            }
            else {
                localStorage.setItem("login", result.user);
                localStorage.setItem("name", result.user.displayName);
                localStorage.setItem("email", result.user.email);
                window.location.href = "/";
                this.props.closePopup();
            }
        });
    }

    render() {
        return (
            <Modal centered show="true" onHide={() => this.HandelModel()}>
                <Modal.Header closeButton>
                    {
                        !this.state.showdiv ?
                            <div>
                                {
                                    !this.state.isregister ? "Sign in" : "Create an account"
                                }
                            </div>
                            :
                            null
                    }
                </Modal.Header>
                <Modal.Body>
                    <Alert variant={this.state.variant} show={this.state.error}>
                        {this.state.msg}
                    </Alert>
                    {
                        !this.state.showdiv ?
                            <div>
                                {
                                    this.props.term === "login" ?
                                        <div>
                                            <div>
                                                To protect your safety and the safety of the community you need to continue with an account. By continuing, you agree to our Community Guidelines, Terms and Privacy Policy.
                                </div><br />
                                        </div>
                                        :
                                        null
                                }

                                <Button className="roundButton btnfb btn-block" size="lg" block onClick={() => this.facebookLogin()}>
                                    <FontAwesomeIcon icon={faFacebookSquare} />&nbsp;&nbsp;Continue with Facebook</Button>

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
                                    <Button variant="secondary" onClick={() => this.handleReset()}>Create Account</Button>
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
                                    <Button variant="secondary" onClick={() => this.handleResetsign()}>Sign In</Button>
                                            </div>

                                        : null
                                }
                            </div>
                            :
                            null
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

export default Login;
