import React, { Component } from 'react';
import { Button, Form, Header, Container, TextArea, Tab } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Complain from './Complain';
import CrimeReport from './CrimeReport';
import MissingReport from './MissingReport';
import MyPosts from './myPosts';


const panes = [
    {menuItem: 'Lodge Your Complains', render: () => <Tab.Pane ><Complain /></Tab.Pane> },
    { menuItem: 'Crime Report', render: () => <Tab.Pane><CrimeReport/></Tab.Pane> },
    { menuItem: 'Missing Person', render: () => <Tab.Pane><MissingReport/></Tab.Pane> },
    { menuItem: 'My Posts', render: () => <Tab.Pane><MyPosts /></Tab.Pane> },
]
class Dashboard extends Component {
    
    
    render() {
        return (
            <div style={{ backgroundColor: 'lightGrey',padding:'3%' }}>
                <Header style={{ backgroundColor: 'lightGrey', padding: '2%', borderBottom: '12px groove grey' }}>My Dashboard</Header>
                <Tab menu={{ fluid: true, vertical: true, tabular: 'right', color:'blue' }} panes={panes} />
            </div>
        );
    }
}

export default Dashboard;