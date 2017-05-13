import React from 'react';
import AppNavbar from './AppNavbar';
import AppContainer from './AppContainer';

export default class AppMain extends React.Component {
    render() {
        return (
            <div>
                <AppNavbar brandName="Manager"></AppNavbar>
                <AppContainer></AppContainer>
            </div>
        );
    }
}