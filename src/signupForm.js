import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Form, Header, Container } from 'semantic-ui-react'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDZLn0i5nMjaysmzFE3kdNyuQz1pH5l-QI",
    authDomain: "signup-form-bccb0.firebaseapp.com",
    databaseURL: "https://signup-form-bccb0.firebaseio.com",
    projectId: "signup-form-bccb0",
    storageBucket: "signup-form-bccb0.appspot.com",
    messagingSenderId: "486917072346"
  };
  firebase.initializeApp(config);

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.signup = this.signup.bind(this)
    }

    signup = (event) => {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const name = this.refs.name.value;
        console.log(email, password)
        const auth = firebase.auth();
        let promise = auth.createUserWithEmailAndPassword(email, password);
        promise.then(user => {
            firebase
                .database()
                .ref(`users/${user.uid}`)
                .set({email: user.email, password: password, name: name});
                window.location = 'http://localhost:3000/login';
        })
        promise.catch(e => {
            let err = e.message;
            console.log(err);
        })
    }


    render() {
        return (
            <div>
                <Container>
                    <Form>
                        <Header>Register Your Account</Header>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Enter Your Name' type="text" ref="name"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Enter Your Email' type="email" ref="email"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder='Enter Your Password' type="password" ref="password"/>
                        </Form.Field>
                        <Button type='submit' onClick={this.signup} primary>Register</Button>
                    </Form>
                </Container>

            </div>
        );
    }
}
export default SignupForm;