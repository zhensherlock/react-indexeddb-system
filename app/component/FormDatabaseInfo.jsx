import React from 'react';

export default class FormDatabaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            validationState: '',
            databaseNames: []
        };
        this.handleChange = this.handleChange.bind(this);

        dbHelper.getDatabaseNames(result => {
            this.setState({ databaseNames: result });
        });
    }

    handleChange(e) {
        let validationState = ''
            , value = e.target.value.trim();
        if (this.state.value && this.state.databaseNames.indexOf(this.state.value) > -1) {
            validationState = 'error';
        }
        else if (this.state.value) {
            validationState = 'success';
        }

        this.setState({
            value: value,
            validationState: validationState
        });

        if (this.props.onDatabaseInfoListener) {
            this.props.onDatabaseInfoListener({
                databaseName: value,
                validationState: validationState
            });
        }
    }

    render() {
        return (
            <FormGroup controlId="formBasicText" validationState={this.state.validationState}>
                <ControlLabel>New Database Name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleChange} />
                <FormControl.Feedback />
            </FormGroup>
        );
    }
}