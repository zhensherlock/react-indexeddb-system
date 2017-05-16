import React from 'react';
import {
    Nav,
    NavItem
} from 'react-bootstrap';
import CreateTable from './CreateTable';
import DBHelper from '../modules/DBHelper';

class TableInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableList: [],
            createTableModal: false,
            currentTable: {}
        };
        this.onCreateSuccess = this.onCreateSuccess.bind(this);

        let dbObject = new DBHelper(this.props.databaseName)
            , self = this
        ;
        dbObject.getTableNames().then(tableNames => {
            self.setState({
                tableList: tableNames
            });
        });
    }

    onCreateSuccess(tableName) {
        this.setState((prevState) => {
            prevState.tableList.push(tableName);
            return {
                tableList: prevState.tableList
            }
        });
    }

    renderCreateTable() {
        if (!this.props.create) {
            return;
        }
        return (
            <CreateTable databaseList={this.state.tableList} onCreateSuccess={this.onCreateSuccess}
                         databaseName={this.props.databaseName}></CreateTable>
        )
    }

    render() {
        return (
            <div>
                <Nav bsStyle="pills">
                    {
                        this.renderCreateTable()
                    }
                    {
                        this.state.tableList.map((name ,index) => {
                            return (
                                <NavItem key={index.toString()}>
                                    {name}
                                </NavItem>
                            );
                        })
                    }
                </Nav>
                {/*<Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal}>*/}
                    {/*<Modal.Header>*/}
                        {/*<Modal.Title>Delete Database</Modal.Title>*/}
                    {/*</Modal.Header>*/}

                    {/*<Modal.Body>*/}
                        {/*Are you sure you want to delete this database:*/}
                        {/*<Label bsStyle="danger">{this.state.currentDatabase.name}</Label>*/}
                    {/*</Modal.Body>*/}

                    {/*<Modal.Footer>*/}
                        {/*<Button onClick={this.closeDeleteModal}>Close</Button>*/}
                        {/*<Button onClick={this.deleteDatabase} bsStyle="danger">Sure</Button>*/}
                    {/*</Modal.Footer>*/}
                {/*</Modal>*/}
            </div>
        );
    }
}

export default TableInfoList