import React from 'react';
import {
    Row,
    PageHeader,
    Nav,
    NavItem
} from 'react-bootstrap';

export default class AppDatabaseDetail extends React.Component {

    render() {
        return (
            <div>
                <PageHeader>Dashboard</PageHeader>
                <Row className="placeholders">
                    <Nav bsStyle="pills">
                        <NavItem>
                            Add Table
                        </NavItem>
                    </Nav>
                </Row>
            </div>
        );
    }
}