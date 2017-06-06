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
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
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
        if (this.state.currentContextmenuTable.hasOwnProperty('showContextmenu')) {
            this.state.currentContextmenuTable.showContextmenu = false;
        }
        item.showContextmenu = true;
        self.setState({
            currentContextmenuTable: item,
            tableList: self.state.tableList
        });
        event.preventDefault();

        // document.addEventListener('click', this.hideMoreButton);
        // event.stopPropagation();
    }

    hideMoreButton() {
        this.state.currentContextmenuTable.showContextmenu = false;
        this.setState({
            tableList: this.state.tableList
        });
        // document.removeEventListener('click' ,this.hideMoreButton);
    }

    onDeleteSuccess(tableName) {
        this.props.history.replace('/database/' + this.props.databaseName);
        this.setState((prevState) => {
            let tableIndex = prevState.tableList.indexOf(tableName);
            prevState.tableList.splice(tableIndex, 1);
            return {
                tableList: prevState.tableList
            }
        });
    }

    render() {
        return (
            <div onClick={this.hideMoreButton}>
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
                                    <TableContextMenu table={item} databaseName={this.props.databaseName}
                                                      onDeleteSuccess={this.onDeleteSuccess}></TableContextMenu>
                                </NavItem>
                            );
                        })
                    }
                </Nav>
            </div>
        );
    }
}

export default TableInfoList