import React from 'react';
import {
    Row,
    PageHeader,
    Nav,
    NavItem
} from 'react-bootstrap';
import DBHelper from '../modules/DBHelper';

export default class AppDatabaseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableNames: [],
            createTableState: false
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

    createTable() {
        this.setState({
            createTableState: true
        });
    }

    renderCreateTable() {
        if (this.state.createTableState) {
            return (
                <NavItem onClick={this.createTable}>
                    Create Table
                </NavItem>
            )
        }
        else {

        }
    }

    render() {
        return (
            <div>
                <PageHeader>{this.props.match.params.name}</PageHeader>
                <Row className="placeholders">
                    <Nav bsStyle="pills">
                        {
                            this.state.tableNames.map(function (name) {
                                <NavItem>
                                    {name}
                                </NavItem>
                            })
                        }
                        {
                            this.renderCreateTable()
                        }
                    </Nav>
                </Row>
            </div>
        );
    }
}