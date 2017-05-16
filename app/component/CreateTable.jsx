import React from 'react';
import {
    NavItem,
    Modal,
    Button,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';
import DBHelper from '../modules/DBHelper'

export default class CreateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false,
            tableName: '',
            validationState: null,
            tableNames: []
        };
        this.openCreateModal = this.openCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveTable = this.saveTable.bind(this);
    }

    openCreateModal() {
        this.setState({ showCreateModal: true });
    }

    closeCreateModal() {
        this.setState({ showCreateModal: false });
    }

    handleChange(e) {
        let validationState = null
            , tableName = e.target.value;
        if (tableName && this.state.tableName.indexOf(tableName) > -1) {
            validationState = 'error';
        }
        else if (tableName) {
            validationState = 'success';
        }

        this.setState({
            tableName: tableName,
            validationState: validationState
        });
    }

    saveTable() {
        let self = this;
        if (self.state.validationState == 'success') {
            let dbHelper = new DBHelper(this.props.databaseName);
            dbHelper.createTable(this.state.tableName).then((tableName) => {
                if (this.props.onCreateSuccess) {
                    this.props.onCreateSuccess(tableName);
                }
                self.closeCreateModal();
            });
        }
    }

    render() {
        return (
            <NavItem onClick={this.openCreateModal}>
                Create Table
                <Modal show={this.state.showCreateModal} onHide={this.closeCreateModal}>
                    <Modal.Header>
                        <Modal.Title>New Database</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup controlId="formTableName" validationState={this.state.validationState}>
                            <ControlLabel>New Table Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.tableName}
                                placeholder="Enter Table Name"
                                onChange={this.handleChange} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeCreateModal}>Close</Button>
                        <Button onClick={this.saveTable} bsStyle="primary">Save Table</Button>
                    </Modal.Footer>
                </Modal>
            </NavItem>
        );
    }
}