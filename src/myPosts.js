import React, { Component } from 'react';
import { Button, Form, Header, Container, TextArea, Tab, Segment, Divider, Item, Feed, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from 'firebase';


class MyPosts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            complains: [
                {
                    name: " ",
                    email: " ",
                    address: " ",
                    issue: " ",
                }
            ],
            crime_report: [
                {
                    Reported_By: " ",
                    Victim_Address: " ",
                    Victim_Detail: " ",
                    Victim_Name: " ",
                }
            ],
            missing_person: [
                {
                    Missing_Person: " ",
                    Person_Address: " ",
                    Person_Identification: " ",
                    Person_Contact: " ",
                }
            ],
            complains1: 'saim'
        }
        this.updataeState = this.updataeState.bind(this);
    }
    updataeState = () => {
        let myPosts = []

        var setStateComplains = (name, email, address, issue) => {
            if (this.state.complains[0].name === " ") {
                this.state.complains.splice(0, 1)
            }

            var complains = this.state.complains.slice();
            complains.push({
                name: name,
                email: email,
                address: address,
                issue: issue
            })
            this.setState({ complains: complains });
            console.log(this.state.complains)
            return complains;
        }
        var setStateCrime = (Reported_By, Victim_Address, Victim_Detail, Victim_Name) => {
            if (this.state.crime_report[0].Victim_Name === " ") {
                this.state.crime_report.splice(0, 1)
            }
            var crime_report = this.state.crime_report.slice();
            crime_report.push({
                Reported_By: Reported_By,
                Victim_Address: Victim_Address,
                Victim_Detail: Victim_Detail,
                Victim_Name: Victim_Name,
            })
            this.setState({ crime_report: crime_report })
            console.log(this.state.crime_report)
            return crime_report;

        }
        var setStateMissing = (Missing_Person, Person_Address, Person_Identification, Person_Contact) => {
            if (this.state.missing_person[0].Missing_Person === " ") {
                this.state.missing_person.splice(0, 1)
            }
            var missing_person = this.state.missing_person.slice();
            missing_person.push({
                Missing_Person: Missing_Person,
                Person_Address: Person_Address,
                Person_Identification: Person_Identification,
                Person_Contact: Person_Contact
            })
            this.setState({ missing_person: missing_person });
            console.log(this.state.missing_person)
            return missing_person;
        }
        const userId = firebase.auth().currentUser.uid;
        let userPosts = firebase.database().ref('saim/' + userId).on('value',
            (snapshot) => {
                const complains = snapshot.val().complains;
                const crime_report = snapshot.val().crime_report;
                const missing_person = snapshot.val().missing_person;
                if (complains) {
                    console.log("-----------complains----------");
                    snapshot.child('complains').forEach(function (childSnapshot) {
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();
                        let name = childData.name;
                        let email = childData.email;
                        let address = childData.address;
                        let issue = childData.issue;
                        setStateComplains(name, email, address, issue);
                        let username = firebase.auth().currentUser.email
                        // console.log(firebase.auth().currentUser.email);
                    })
                    console.log("-----------complains ended----------");
                }
                if (crime_report) {

                    console.log("-----------crime----------");
                    snapshot.child('crime_report').forEach(function (childSnapshot) {
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();
                        let Reported_By = childData.Reported_By;
                        let Victim_Address = childData.Victim_Address;
                        let Victim_Detail = childData.Victim_Detail;
                        let Victim_Name = childData.Victim_Name;
                        setStateCrime(Reported_By, Victim_Address, Victim_Detail, Victim_Name);
                    })
                    console.log("-----------crime----------");
                }
                if (missing_person) {
                    console.log("-----------missing----------");
                    snapshot.child('missing_person').forEach(function (childSnapshot) {
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();
                        let Missing_Person = childData.Missing_Person;
                        let Person_Address = childData.Person_Address;
                        let Person_Identification = childData.Person_Identification;
                        let Person_Contact = childData.Person_Contact;
                        setStateMissing(Missing_Person, Person_Address, Person_Identification, Person_Contact);
                    })
                    console.log("-----------missing----------");
                    let showPosts = true;

                }


            })


    }

    componentDidMount() {
        let updataeState = this.updataeState;
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                console.log("Not exist");
            } else {
                updataeState();
            }
        });

    };



    render() {
        let username = firebase.auth().currentUser.email;
        let index = username.indexOf("@");
        username = username.slice(0, 6);
        let myPosts = this.state.complains.concat(this.state.crime_report).concat(this.state.missing_person);
        let indexOfComplains = myPosts.map(function (e) { return e.name }).indexOf(" ");


        if (indexOfComplains > -1) {
            myPosts.splice(indexOfComplains, 1);
            let indexOfCrime = myPosts.map(function (e) { return e.Reported_By }).indexOf(" ");
            myPosts.splice(indexOfCrime, 1);
            let indexOfMissing = myPosts.map(function (e) { return e.Missing_Person }).indexOf(" ");
            myPosts.splice(indexOfMissing, 1);
            myPosts = myPosts;
        }


        return (

            <Container >

                <h1 icon style={{backgroundColor:'orange'}} > <Icon name='unordered list' /> My Posts</h1>
                <h2 icon>
                    <Icon name='feed' />
                    Complains
                </h2>
                <Header icon>   
                    <a>{username} </a>has posted Complain(s):
                </Header>
                {
                    this.state.complains.map((MyData, index) => {
                        return (
                            <div key={index}>
                                <h1></h1>
                                <Segment color='red'>
                                    <Item>
                                        <Icon name='user circle outline' size="big"/>
                                        <Item.Content>
                                            <Item.Header as='h1' style={{ color: 'red' }}>Victim's Name: {MyData.name}</Item.Header>
                                            <Item.Header as='h5'><b style={{color:'green'}}>Victim's Email: </b>{MyData.email}</Item.Header>
                                            <Item.Description>
                                                <b>Issue For Complaining:</b> {MyData.issue}
                                            </Item.Description>
                                            <Item.Extra><b>Victim's Address: </b>{MyData.address}</Item.Extra>
                                        </Item.Content>
                                    </Item>
                                    <Divider section />
                                </Segment>

                            </div>

                        )
                    })
                }
                
                <h1 icon><Icon name='feed' />Crime Reports:</h1>
                <Header><a>{username} </a>has posted Crime Report(s):</Header>
                {

                    this.state.crime_report.map((MyData, index) => {
                        return (
                            <div key={index}>
                                <h1></h1>
                                <Segment color='yellow'>
                                    <Item>
                                        <Icon name='user circle outline' size="big" />
                                        {/* <Item.Image size='tiny' src='/assets/images/wireframe/image.png' /> */}
                                        <Item.Content>
                                            <Item.Header as='h1' style={{ color: 'red' }}>Criminials's Name: {MyData.Victim_Name}</Item.Header>
                                            <Item.Header as='h5'><b style={{ color: 'green' }}>Criminal Details Reported By: </b>{MyData.Reported_By}</Item.Header>
                                            <Item.Description>
                                                <b>Criminal Details Why is Criminal:</b> {MyData.Victim_Detail}
                                            </Item.Description>
                                            <Item.Extra><b>Criminal's Address: </b>{MyData.Victim_Address}</Item.Extra>
                                        </Item.Content>
                                    </Item>
                                    <Divider section />
                                </Segment>

                            </div>

                        )
                    })
                }
                <h1 icon> <Icon name='feed' />Missing Person Details:</h1>
                <Header><a>{username} </a>has posted Missing Person Detail(s):</Header>
                {
                    this.state.missing_person.map((MyData, index) => {
                        return (
                            <div key={index}>
                                <h1></h1>
                                <Segment color='yellow'>
                                    <Item>
                                        <Icon name='user circle outline' size="big" />
                                        {/* <Item.Image size='tiny' src='/assets/images/wireframe/image.png' /> */}
                                        <Item.Content>
                                            <Item.Header as='h1' style={{ color: 'red' }}>Missing Person's Name: {MyData.Missing_Person}</Item.Header>
                                            <Item.Header as='h5'><b style={{ color: 'green' }}>Missing Person's Address: </b>{MyData.Person_Address}</Item.Header>
                                            <Item.Description>
                                                <b>Missing Person's Contact Number:</b> {MyData.Person_Contact}
                                            </Item.Description>
                                            <Item.Extra><b>Missing Person's Sign Of Identification: </b>{MyData.Person_Identification}</Item.Extra>
                                        </Item.Content>
                                    </Item>
                                    <Divider section />
                                </Segment>

                            </div>

                        )
                    })
                }

            </Container>
        );
    }
}

export default MyPosts;

