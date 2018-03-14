import React, { Component } from 'react';
import { Button, Form, Header, Container, TextArea } from 'semantic-ui-react'
import firebase from 'firebase'

class Complain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            issue: "",
            adress: ""
        },
            this.complain = this.complain.bind(this);
    }

    complain = (event) => {
        const email = this.state.email;
        const issue = this.state.issue;
        const name = this.state.name;
        const address = this.state.address;

        if (!(email && issue && name && address)) {
            console.log("Enter something please");
        }
        else {
            console.log(this.state.name);
            console.log(this.state.email);
            console.log(this.state.issue);
            console.log(this.state.address);
            var userId = firebase.auth().currentUser.uid;
            console.log(userId);

            let data = firebase
                .database()
                .ref(`saim/${userId}`).child('/complains/')
                .push().set({ email: this.state.email, name: this.state.name, issue: this.state.issue, address: this.state.address });
            console.log(data);
            // let something =firebase.database().ref('saim/' + userId).on('value').
            //             then(function (snapshot) {
            //                console.log(snapshot.val().name);
            //                 console.log(snapshot.val().email);
            //                 console.log(snapshot.val().issue);
            //                 console.log(snapshot.val().address);
            //             })
            this.setState({
                name: " ",
                email: " ",
                issue: " ",
                adress: " "

            })
        }

    }

    render() {
        return (
            <div >
                <Container>
                    <Form>
                        <Header>Lodge Your Complain Here</Header>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Enter Your Name' type="text" name="name" onChange={
                                (event) => {
                                    this.setState({
                                        name: event.target.value
                                    })
                                }
                            }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Enter Your Email' type="email" name="email" onChange={
                                (event) => {
                                    this.setState({
                                        email: event.target.value
                                    })
                                }
                            } />
                        </Form.Field>
                        <Form.Field>
                            <label>Issue For Complaining</label>
                            <TextArea placeholder='Type Issue here' type="text" name="issue" onChange={
                                (event) => {
                                    this.setState({
                                        issue: event.target.value
                                    })
                                }
                            } />
                        </Form.Field>
                        <Form.Field>
                            <label>Address</label>
                            <TextArea placeholder='Type Address here' type="text" name="address" onChange={
                                (event) => {
                                    this.setState({
                                        address: event.target.value
                                    })
                                }
                            } />
                        </Form.Field>

                        <Button type='submit' onClick={this.complain} >Submit My  Comlain</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default Complain;