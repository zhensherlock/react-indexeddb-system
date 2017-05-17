import React from 'react';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';
import { Route, Router } from 'react-router-dom'

import DatabaseInfoList from '../component/DatabaseInfoList';
import AppDashboard from './AppDashboard';
import AppDatabaseDetail from './AppDatabaseDetail';
import createBrowserHistory from 'history/createBrowserHistory'
let history = createBrowserHistory();

export default class AppContainer extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col sm={3} md={2} className="sidebar">
                            <DatabaseInfoList create history={history}>
                            </DatabaseInfoList>
                        </Col>
                        <Col sm={9} md={9} smOffset={3} mdOffset={2} className="main">
                            <div>
                                <Route exact path="/" component={AppDashboard}/>
                                <Route path="/database/:databaseName" component={AppDatabaseDetail} history={history}/>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Router>
        );
    }
}