import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Form, Header, Container } from 'semantic-ui-react'

class loginForm extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this)
    }

    //Login for firebase authentication
    //==========================================================================
    login = (event) => {
          const email = this.refs.email.value;
          const password = this.refs.password.value;
          console.log(email, password)
          const auth = firebase.auth();
          let promise = auth.signInWithEmailAndPassword(email, password);
          promise
              .then(redirect => {
              window.location = 'http://localhost:3000/Dashboard';
          })
              .catch(e => {
                  let err = e.message;
                  console.log(err);
              })
      }
      //**************************************************************************

    render() {
        return (
            <div>
                <Container>
                    <Form>
                        <Header>Login in Your Account</Header>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Enter Your Email' type="email" ref="email"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder='Enter Your Password' type="password" ref="password"/>
                        </Form.Field>
                        <Button type='submit' onClick={this.login} primary>Login</Button>
                    </Form>
                </Container>

            </div>
        );
    }
}
export default loginForm;