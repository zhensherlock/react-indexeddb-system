import React from 'react';
import {
    Nav,
    NavItem,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import CreateTable from './CreateTable';
import TableContextMenu from './TableContextMenu';
import DBHelper from '../modules/DBHelper';

class TableInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableList: [],
            createTableModal: false,
            currentTable: {},
            currentContextmenuTable: {}
        };
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
        this.hideMoreButton = this.hideMoreButton.bind(this);
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.databaseName != this.props.databaseName) {
            this.load(nextProps);
        }
    }

    load(props) {
        let dbObject = new DBHelper(props.databaseName)
            , self = this
        ;
        dbObject.getTableList().then(tableList => {
            self.setState({
                tableList: tableList
            });
        });
    }

    onCreateSuccess(tableName) {
        this.setState((prevState) => {
            prevState.tableList.push({
                name: tableName
            });
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

    chooseTable(item) {
        this.props.history.push('/database/' + this.props.databaseName + '/' + item.name);
    }

    showMoreButton(item, event) {
        let self = this;
        item.showContextmenu = true;
        self.setState({
            currentContextmenuTable: item,
            tableList: self.state.tableList
        });
        event.preventDefault();

        window.addEventListener('click' ,this.hideMoreButton);
        // event.stopPropagation();
    }

    hideMoreButton() {
        this.state.currentContextmenuTable.showContextmenu = false;
        this.setState({
            tableList: this.state.tableList
        });
        window.removeEventListener('click' ,this.hideMoreButton);
    }

    render() {
        return (
            <div>
                <Nav bsStyle="pills">
                    {
                        this.renderCreateTable()
                    }
                    {
                        this.state.tableList.map((item ,index) => {
                            return (
                                <NavItem key={index.toString()} onClick={this.chooseTable.bind(this, item)}
                                         onContextMenu={event => this.showMoreButton(item, event)}>
                                    {item.name}
                                    <TableContextMenu table={item}></TableContextMenu>
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