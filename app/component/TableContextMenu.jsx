import React from 'react';
import {
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import DBHelper from '../modules/DBHelper'

export default class TableContextMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.table.showContextmenu) {
            return null;
        }
        return (
            <ListGroup className="contextmenu-container">
                <ListGroupItem>Edit</ListGroupItem>
                <ListGroupItem>Remove</ListGroupItem>
            </ListGroup>
        )
    }
}