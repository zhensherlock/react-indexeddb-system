import React from 'react';
import {
    Row,
    PageHeader
} from 'react-bootstrap';
import DBHelper from '../modules/DBHelper';
import { Route } from 'react-router-dom'

export default class AppTableDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h2>{this.props.match.params.tableName}</h2>
            </div>
        );
    }
}