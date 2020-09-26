import React from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom'
import './App.css';
import Novbar from './components/Novbar.js'
import Footer from './Masters/Footer.js'
import Home from './components/Home.js'
import Background from './components/Background.js'
import Services from './components/Services.js'
import Faq from './components/Faq.js'
import Testimonials from './components/Testimonials.js'
import GetInTouch from './components/GetInTouch.js'
import Search from './components/Search.js'
import Login from './components/Login.js'
import Logout from './components/Logout.js'
import UserAccount from './components/UserAccount.js'
import Recoverpwd from './components/recoverpwd.js'

function App() {
  return (
    <div className="MainContainer"> 
      <Router basename='/'>
        <Novbar/>
        <Route exact path="/"><Home /></Route>
        <Route path="/Background"><Background /></Route>
        <Route path="/Services"><Services /></Route>
        <Route path="/Faq"><Faq /></Route>
        <Route path="/Testimonials"><Testimonials /></Route>
        <Route path="/GetInTouch"><GetInTouch /></Route>
        <Route path="/Search"><Search /></Route>
        <Route path="/Logout"><Logout /></Route>
        <Route path="/UserAccount"><UserAccount /></Route>
        <Route path="/Recoverpwd"><Recoverpwd /></Route>
        <Route path="/Login" render={props => (<Login {...props} />)}></Route>
      </Router >
      <Footer/>
    </div>
  );
}

export default App;
