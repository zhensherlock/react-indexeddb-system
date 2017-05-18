import React from 'react';
import {
    Nav,
    NavItem,
    Modal,
    Button,
    Glyphicon,
    Label
} from 'react-bootstrap';
import CreateDatabase from './CreateDatabase';
import DBHelper from '../modules/DBHelper';

class DatabaseInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            databaseList: [],
            showDeleteModal: false,
            currentDatabase: {}
        };
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.deleteDatabase = this.deleteDatabase.bind(this);
        DBHelper.getDatabaseNames().then(result => {
            this.setState({databaseList: result});
        });
    }

    renderCreateDatabase() {
        if (!this.props.create) {
            return;
        }
        return (
            <CreateDatabase databaseList={this.state.databaseList} onCreateSuccess={this.onCreateSuccess}></CreateDatabase>
        )
    }

    onCreateSuccess(databaseName) {
        this.setState((prevState) => {
            prevState.databaseList.push(databaseName);
            return {
                databaseList: prevState.databaseList
            }
        });
    }

    deleteDatabase() {
        let self = this;
        DBHelper.deleteDatabase(this.state.currentDatabase.name).then(() => {
            self.setState((prevState) => {
                prevState.databaseList.splice(this.state.currentDatabase.index, 1);
                return {
                    databaseList: prevState.databaseList
                }
            });
            self.closeDeleteModal();
        });
    }

    openDeleteModal(event, databaseName, databaseIndex) {
        event.stopPropagation();
        this.setState({
            showDeleteModal: true,
            currentDatabase: {
                name: databaseName,
                index: databaseIndex
            }
        });
    }

    closeDeleteModal() {
        this.setState({
            showDeleteModal: false
        });
    }

    chooseDatabase(databaseName) {
        if (databaseName != 'dashboard') {
            this.props.history.push('/database/' + databaseName);
        }
        else {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <Nav className="nav-sidebar">
                    {
                        this.renderCreateDatabase()
                    }
                    <NavItem onClick={this.chooseDatabase.bind(this, 'dashboard')}>
                        Dashboard
                    </NavItem>
                    {
                        this.state.databaseList.map((item, index) => {
                            return (
                                <NavItem key={index.toString()} href="javascript:;"
                                         onClick={this.chooseDatabase.bind(this, item)}>
                                    {item}
                                    <Glyphicon glyph="remove" className="pull-right"
                                       onClick={(event) => this.openDeleteModal(event, item, index)}/>
                                </NavItem>
                            );
                        })
                    }
                </Nav>
                <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal}>
                    <Modal.Header>
                        <Modal.Title>Delete Database</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you sure you want to delete this database:
                        <Label bsStyle="danger">{this.state.currentDatabase.name}</Label>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeDeleteModal}>Close</Button>
                        <Button onClick={this.deleteDatabase} bsStyle="danger">Sure</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DatabaseInfoList