import React, { Component } from 'react';
import Videocall from './videocall.js';
import { Button } from 'react-bootstrap';
import Login from './Login.js';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            showPopup: false,
            showVideo: false
        }
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }


    render() {
        return (
            <div>
                <section id="banner">
                    <h2 className="textonimg">
                        Relate with love
                                        </h2>
                    <p className="textonimg1">Our purpose is to help adults build intimacy <br>
                    </br>that embodies love's most profound qualities <br>
                    </br>throughout all stages of life</p>

                </section>
                {
                    this.state.showPopup ?
                        <Login closePopup={this.togglePopup.bind(this)} term={"home"} />
                        : null
                }
                <section id="divvideo">
                    <div class="display-t text-center">
                        <h2 className="textonimg2">
                            {
                                localStorage.getItem("login") ?
                                    "Hi! " + localStorage.getItem("name") : ""
                            }
                        </h2>
                        <div className="">
                            {
                                localStorage.getItem("login") ?
                                    // <Videocall/>
                                    <div>
                                        {
                                            this.state.showVideo ?
                                                <Videocall />
                                                : <div className="receiverDiv">
                                                    <div className="innerDiv">
                                                        <Button className="connectbtn" variant="outline-light" onClick={() => this.setState({ showVideo: true })}>Connect</Button>
                                                    </div>
                                                </div>
                                        }
                                        
                                    </div>
                                    :
                                    <div className="receiverDiv"><img src="./Images/videocall-blur.jpg"/>
                                        <div className="innerDiv">
                                            <Button className="connectbtn btncoonectbefore" variant="outline-light" onClick={this.togglePopup.bind(this)}>Connect</Button>
                                        </div>
                                    </div>
                               }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
