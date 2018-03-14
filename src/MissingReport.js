import React, { Component } from 'react';
import { Button, Form, Header, Container, TextArea } from 'semantic-ui-react';
import firebase from 'firebase';


class MissingReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Missing_Person: "",
            Person_Address: "",
            Person_Contact: "",
            Person_Identification: ""
        },
            this.MissingReport = this.MissingReport.bind(this);
    }



    MissingReport = (event) => {
        const Person_Address = this.state.Person_Address;
        const Missing_Person = this.state.Missing_Person;
        const Person_Contact = this.state.Person_Contact;
        const Person_Identification = this.state.Person_Identification;

        if (!(Person_Address && Missing_Person && Person_Contact && Person_Identification)) {
            console.log("Enter something please");
        }
        else {
            console.log(this.state.Missing_Person);
            console.log(this.state.Person_Address);
            console.log(this.state.Person_Contact);
            console.log(this.state.Person_Identification);
            var userId = firebase.auth().currentUser.uid;
            console.log(userId);
            let data = firebase
                .database()
                .ref(`saim/${userId}`).child('/missing_person/')
                .push().set({
                    Missing_Person: this.state.Missing_Person,
                    Person_Address: this.state.Person_Address,
                    Person_Contact: this.state.Person_Contact,
                    Person_Identification: this.state.Person_Identification
                });
            console.log(data);
            this.setState({
                Missing_Person: "",
                Person_Address: "",
                Person_Contact: "",
                Person_Identification: ""
            })
        }

    }

    render() {
        return (
            <div >
                <Container>
                    <Form>
                        <Header>Submit Missing Person's Details</Header>
                        <Form.Field>
                            <label>Missing Person Name :</label>
                            <input placeholder='Enter Missing Person Name' type="text" name="pName"
                                onChange={
                                    (event) => {
                                        this.setState({
                                            Missing_Person: event.target.value
                                        })
                                    }
                                }

                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Person's Address</label>
                            <TextArea placeholder='Person Address' type="text" name="pAddress"
                                onChange={
                                    (event) => {
                                        this.setState({
                                            Person_Address: event.target.value
                                        })
                                    }
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Person's Phone Number:</label>
                            <input placeholder="Enter Person's Phone Number" type="tel" min="0" max="0" name="yourName"
                                onChange={
                                    (event) => {
                                        this.setState({
                                            Person_Contact: event.target.value
                                        })
                                    }
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Person's Identification Mark:</label>
                            <TextArea placeholder="Type Person's Identification Mark" type="text" name="Address"

                                onChange={
                                    (event) => {
                                        this.setState({
                                            Person_Identification: event.target.value
                                        })
                                    }
                                }

                            />
                        </Form.Field>

                        <Button type='submit' onClick={this.MissingReport} >Submit Details</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default MissingReport;