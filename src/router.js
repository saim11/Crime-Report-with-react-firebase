import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import SignupForm from './signupForm';
import LoginForm from './loginForm';
import Complain from './Complain';
import Dashboard from './Dashboard';
import CrimeReport from './CrimeReport';
import MissingReport from './MissingReport';
import MyPosts from './myPosts';
import Home from './Home';


class Routing extends Component {
    render() {
        return (
            <div >
                <Router >
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={SignupForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/complain" component={Complain} />
                        <Route path="/Dashboard" component={Dashboard} />
                        <Route path="/crime-report" component={CrimeReport}/>
                        <Route path="/missing-report" component={MissingReport}/>
                        <Route path="/my-posts" component={MyPosts} />
                    </div>

                </Router>

            </div>
        );
    }
}

export default Routing;