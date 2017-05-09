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

export default class CreateDatabase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false,
            databaseName: '',
            validationState: null,
            databaseNames: []
        };
        this.openCreateModal = this.openCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveDatabase = this.saveDatabase.bind(this);
    }

    openCreateModal() {
        this.setState({ showCreateModal: true });
    }

    closeCreateModal() {
        this.setState({ showCreateModal: false });
    }

    handleChange(e) {
        let validationState = null
            , databaseName = e.target.value;
        if (databaseName && this.state.databaseNames.indexOf(databaseName) > -1) {
            validationState = 'error';
        }
        else if (databaseName) {
            validationState = 'success';
        }

        this.setState({
            databaseName: databaseName,
            validationState: validationState
        });
    }

    saveDatabase() {
        let self = this;
        if (self.state.validationState == 'success') {
            DBHelper.createDatabase(this.state.databaseName, () => {
                if (this.props.onCreateSuccess) {
                    this.props.onCreateSuccess(this.state.databaseName);
                }
                self.closeCreateModal();
            });
        }
    }

    render() {
        return (
            <NavItem onClick={this.openCreateModal}>
                Create New Database
                <Modal show={this.state.showCreateModal} onHide={this.closeCreateModal}>
                    <Modal.Header>
                        <Modal.Title>New Database</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup controlId="formDatabaseName" validationState={this.state.validationState}>
                            <ControlLabel>New Database Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.databaseName}
                                placeholder="Enter Database Name"
                                onChange={this.handleChange} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeCreateModal}>Close</Button>
                        <Button onClick={this.saveDatabase} bsStyle="primary">Save Database</Button>
                    </Modal.Footer>
                </Modal>
            </NavItem>
        );
    }
}