import React from 'react';
import {
    Row,
    PageHeader
} from 'react-bootstrap';
import DBHelper from '../modules/DBHelper';
import TableInfoList from "../component/TableInfoList";

export default class AppDatabaseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableNames: []
        };

        let dbObject = new DBHelper(props.match.params.name)
            , self = this
        ;

        dbObject.getTableNames().then(tableNames => {
            self.setState({
                tableNames: tableNames
            });
        });
    }

    render() {
        return (
            <div>
                <PageHeader>{this.props.match.params.name}</PageHeader>
                <Row className="placeholders">
                    <TableInfoList create databaseName={this.props.match.params.name}>
                    </TableInfoList>
                </Row>
            </div>
        );
    }
}