import React from 'react';
import {
    Grid,
    Row,
    Col,
    Nav,
    NavItem
} from 'react-bootstrap';

import DatabaseInfoList from '../component/DatabaseInfoList';

export default class AppContainer extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row className="show-grid">
                    <Col sm={3} md={2} className="sidebar">
                        <DatabaseInfoList create>
                        </DatabaseInfoList>
                    </Col>
                    <Col sm={9} md={9} smOffset={3} mdOffset={2} className="main">
                        col
                    </Col>
                </Row>
            </Grid>
        );
    }
}