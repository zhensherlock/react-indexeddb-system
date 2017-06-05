import React from 'react';
import {
    ListGroup,
    ListGroupItem,
    Modal,
    Label,
    Button
} from 'react-bootstrap';
import DBHelper from '../modules/DBHelper'

export default class TableContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false
        };
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
    }

    openDeleteModal() {
        this.setState({
            showDeleteModal: true
        });
    }

    closeDeleteModal() {
        this.setState({
            showDeleteModal: false
        });
    }

    deleteTable() {
        let self = this
            , dbHelper = new DBHelper(self.props.databaseName)
        ;
        dbHelper.deleteTable(self.props.table.name).then((tableName) => {
            self.closeDeleteModal();
            if (this.props.onDeleteSuccess) {
                this.props.onDeleteSuccess(tableName);
            }
        });
    }

    componentDidMount() {
        // ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
        //     event.stopPropagation();
        // }, false);
        // this.element.addEventListener('click', event => {
        //    event.stopPropagation();
        // }, false);
    }

    handleParentClick(event) {
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
    }

    enter(dom) {
        // dom.addEventListener('click', event => {
        //     event.stopPropagation();
        // });
    }

    renderContextMenuContainer() {
        if (!this.props.table.showContextmenu) {
            return null;
        }
        return (
            <div>
                <ListGroup className="contextmenu-container">
                    <ListGroupItem>Edit</ListGroupItem>
                    <ListGroupItem onClick={this.openDeleteModal}>Remove</ListGroupItem>
                </ListGroup>
                <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal}
                       onEnter={this.enter} onClick={this.handleParentClick}>
                    <Modal.Header>
                        <Modal.Title>Delete Table</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you sure you want to delete this table:
                        <Label bsStyle="danger">{this.props.table.name}</Label>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeDeleteModal}>Close</Button>
                        <Button onClick={this.deleteTable} bsStyle="danger">Sure</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    render() {
        return (
            <div ref={node => { this.element = node; }} onClick={this.handleParentClick}>
                {
                    this.renderContextMenuContainer()
                }
            </div>
        )
    }
}