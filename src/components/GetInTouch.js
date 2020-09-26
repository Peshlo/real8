import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

class GetInTouch extends Component {
    saveDate() {
        alert("Work in progress");
    }

    render() {
        return (
            <div className="container">
                <section id="main" >
                    <div class="inner">
                        <header class="container">
                            <h1>Get In Touch</h1>
                        </header>
                        <div className="headcommingsoon">
                            Coming Soon
                    </div>
                    </div>
                </section>
                <div style={{ display: "none" }}>
                    <h1>Tell us about yourself</h1><br />
                    <div>
                        1. What are 3-5 adjectives that best capture the essence of you?<br />
                        <input type="text" className="form-control" /><br />

                    2. What dating apps have you used?<br />
                        <input type="text" className="form-control" /><br />

                    3. What do you like most about the apps you have used?<br />
                        <input type="text" className="form-control" /><br />

                    4. What do you like least about the apps you have used?<br />
                        <input type="text" className="form-control" /><br />

                    5. What's most important for you in a dateing app that's been missing?<br />
                        <input type="text" className="form-control" /><br />

                    6. In general, What are your experiences with feeling isolated? With feeling connected?<br />
                        <input type="text" className="form-control" /><br /><br />

                    If you would like to participate, please agree to the following:
                    <ol>
                            <li>
                                the contents of your interaction will be confidential except that it will be available to Real8 staff members solely for the purpose of product development,
                        </li>
                            <li>
                                you forego rights to our use of the contents of your interaction,
                        </li>
                            <li>
                                you are participating voluntarily on a pro bono basis, and
                        </li>
                            <li>
                                you will not disclose the details of our project to anyone untill we go public with it.
                        </li>
                        </ol>  <br />

                        <input type="checkbox" /> I agree to the above terms. <br />

                    First Name & last initial: <input type="text" className="form-control" /><br />

                    Age: <input type="text" className="form-control" /><br />

                    Gender: &nbsp;&nbsp;<input type="checkbox" /> Male&nbsp;&nbsp;&nbsp;&nbsp;
                     <input type="checkbox" /> Female &nbsp;&nbsp;&nbsp;&nbsp;
                     <input type="checkbox" /> Transgender <br /><br />

                    Sexual orientation: <input type="text" className="form-control" /><br />

                    Occupation: <input type="text" className="form-control" /><br />
                    Schedule an online meeting with our experts: Date Time
                    <br /><br />

                        <Button onClick={() => this.saveDate()} variant="outline-dark">
                            Submit
                    </Button>
                    </div>
                </div>
            </div >
        )
    }
}

export default GetInTouch;