import React from 'react';
import {
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap';

export default class AppNavbar extends React.Component {
    render() {
        return (
            <Navbar fixedTop inverse collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">{this.props.brandName}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem href="http://zhensherlock.github.io">Blog Home</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}