import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import logo from '../Images/Logo.png';
import Login from "./Login.js"
import ReactTooltip from 'react-tooltip'

class Novbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showPopup: false,
            showMenu: false,
            name: "",
            picture: "",
            email: ""
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (!this.dropdownMenu.contains(event.target)) {

            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

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
                 <Navbar collapseOnSelect expand="lg" className="navbar">
                    <Navbar.Brand href="#"><img src={logo} alt="Real8" /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav navbar" />
                    <Navbar.Collapse id="responsive-navbar-nav navbar">
                        <Nav className="ml-auto">
                        <Nav.Link href="#">
                                <Link className="menulink" to="/">Home</Link>
                            </Nav.Link>
                            <Nav.Link href="#">
                                <Link className="menulink"  to="/Background">About Us</Link>
                            </Nav.Link>
                            <Nav.Link href="#"><Link className="menulink" to="/Services">How To Use</Link> </Nav.Link>
                            <Nav.Link href="#"> <Link className="menulink" to="/Faq">Faq</Link></Nav.Link>
                            {/* <Nav.Link href="#"><Link className="menulink" to="/Testimonials">Testimonials</Link></Nav.Link> */}
                            <Nav.Link href="#"><Link className="menulink" to="/GetInTouch">Get In Touch</Link></Nav.Link>
                            {/* <Nav.Link href="#"><Link className="menulink" to="/Search"><FontAwesomeIcon icon={faSearch} /></Link></Nav.Link> */}
                            <Form inline>
                            {
                                
                                localStorage.getItem("login") ?
                                    // 
                                    <div>
                                        <ReactTooltip type="dark" effect="float" />
                                        <FontAwesomeIcon onClick={this.showMenu}
                                            data-tip={localStorage.getItem("name")}
                                            color="#aa6362"
                                            style={{cursor:"pointer"}}
                                            className="fa-3x" icon={faUserCircle} />
                                    </div>
                                    : <Button variant="outline-light" onClick={this.togglePopup.bind(this)}>Login</Button>
                            }


                            {
                                this.state.showMenu
                                    ? (
                                        <div className="dropdown"
                                            ref={(element) => {
                                                this.dropdownMenu = element;
                                            }}
                                        >
                                            <div className="dropdown-content">
                                                <Link to="/UserAccount">Account</Link>
                                                <Link to="/Logout">Sign Out</Link>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        null
                                    )
                            }
                        </Form>
                    
                        </Nav>
                    
                    </Navbar.Collapse>
                </Navbar>

                {
                    this.state.showPopup ?
                        <Login closePopup={this.togglePopup.bind(this)} term={"login"} />
                        : null
                }
            </div>
        );
    }
}

export default Novbar;