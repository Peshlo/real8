import React, { Component } from 'react'
import { Button, Container,Alert } from 'react-bootstrap'
import Spinner from 'react-spinkit';
import fire from './fire.js'
import {Link} from 'react-router-dom'

export default class Recoverpwd extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            error: null,
            formSent: false,
            working: false,
        }
    }

    sendEmail() {
        if (this.state.email) {
            this.setState({ working: true,error:null });

            fire.auth().sendPasswordResetEmail(this.state.email)
                .then((result) => {
                    this.setState({ formSent: true, working: false });
                }).catch((err)=>{
                    this.setState({ error: err.message, working: false })
                })
        }
        else{
            this.setState({error:"Enter eMail Id."})
        }
    }

    render() {
        return (
            <>
                {
                    (this.state.working) ?
                        <Spinner spinnerName="three-bounce" />
                        :
                        <Container>
                            <table width="50%">
                                <thead>
                                    <tr>
                                        <th className="fltright" align="left">
                                            <h1 className="pb-3">Reset password</h1>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Please enter the email you used when joining:</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input onChange={(e) => this.setState({ email: e.target.value })} className="form-control" type="email" placeholder="Email Address" />
                                            <br />
                                            { this.state.error ? <Alert variant="danger" >{this.state.error}</Alert> : ''}
                                            { this.state.formSent? <Alert variant="primary" >An email to reset your password has been sent!</Alert> :""}
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Button className="roundButton" onClick={() => this.sendEmail()} >Send</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Link to="/"><Button variant="outline-secondary" className="roundButton">Cancel</Button></Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Container>
                }
            </>
        )
    }

}
