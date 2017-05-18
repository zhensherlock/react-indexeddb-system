import React from 'react';
import {
    Row,
    PageHeader
} from 'react-bootstrap';
import DBHelper from '../modules/DBHelper';
import TableInfoList from "../component/TableInfoList";
import { Route } from 'react-router-dom'
import AppTableDetail from './AppTableDetail';

export default class AppDatabaseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <PageHeader>{this.props.match.params.databaseName}</PageHeader>
                <Row className="placeholders">
                    <TableInfoList create databaseName={this.props.match.params.databaseName} history={this.props.history}>
                    </TableInfoList>
                </Row>
                <Route path="/database/:databaseName/:tableName" component={AppTableDetail}/>
            </div>
        );
    }
}