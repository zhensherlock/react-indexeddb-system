import React from 'react';
import {
    Row,
    PageHeader
} from 'react-bootstrap';


export default class AppDashboard extends React.Component {

    render() {
        return (
            <div>
                <PageHeader>Dashboard</PageHeader>
                <Row className="placeholders">
                    <p>
                        Welcome to IndexedDB Manage System
                    </p>
                </Row>
            </div>
        );
    }
}