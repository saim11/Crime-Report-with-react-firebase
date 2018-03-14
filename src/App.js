import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './signupForm'
import Routing from './router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routing />
      </div>
    );
  }
}

export default App;
