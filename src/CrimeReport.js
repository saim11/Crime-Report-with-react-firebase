import React, { Component } from 'react';
import { Button, Form, Header, Container, TextArea } from 'semantic-ui-react';
import firebase from 'firebase';

class CrimeReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Victim_Name: "",
            Victim_Detail: "",
            Reported_By: "",
            Victim_Address: ""
        },
            this.CrimeReport = this.CrimeReport.bind(this);
    }

    CrimeReport = (event) => {
        const Victim_Name = this.state.Victim_Name;
        const Victim_Detail = this.state.Victim_Detail;
        const Reported_By = this.state.Reported_By;
        const Victim_Address = this.state.Victim_Address;

        if (!(Victim_Name && Victim_Detail && Reported_By && Victim_Address)) {
            console.log("Enter something please");
        }
        else {
            console.log(this.state.Victim_Name);
            console.log(this.state.Victim_Detail);
            console.log(this.state.Reported_By);
            console.log(this.state.Victim_Address);
            var userId = firebase.auth().currentUser.uid;
            console.log(userId);

            let data = firebase
                .database()
                .ref(`saim/${userId}`).child('/crime_report/')
                .push().set({ Victim_Name: this.state.Victim_Name, Victim_Detail: this.state.Victim_Detail, Reported_By: this.state.Reported_By, Victim_Address: this.state.Victim_Address });
            console.log(data);
            this.setState({
                Victim_Name: "",
                Victim_Detail: "",
                Reported_By: "",
                Victim_Address: ""

            })
        }

    }


    render() {
        return (
            <div >
                <Container>
                    <Form>
                        <Header>Lodge Crime Report</Header>
                        <Form.Field>
                            <label>Victim Name</label>
                            <input placeholder='Enter Victim Name' type="text" name="victimName" onChange={
                                (event) => {
                                    this.setState({
                                        Victim_Name: event.target.value
                                    })
                                }
                            }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Crime of Victim</label>
                            <TextArea placeholder='Crime Details Of Victim' type="text" name="detail"
                                onChange={
                                    (event) => {
                                        this.setState({
                                            Victim_Detail: event.target.value
                                        })
                                    }
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Reported By (Name)</label>
                            <input placeholder='Enter Reporter Name' type="text" name="yourName"

                                onChange={
                                    (event) => {
                                        this.setState({
                                            Reported_By: event.target.value
                                        })
                                    }
                                }

                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Address of Victim</label>
                            <TextArea placeholder='Type Address Of Victim' type="text" name="Address"
                                onChange={
                                    (event) => {
                                        this.setState({
                                            Victim_Address: event.target.value
                                        })
                                    }
                                }
                            />
                        </Form.Field>

                        <Button type='submit' onClick={this.CrimeReport} >Submit Report</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default CrimeReport;