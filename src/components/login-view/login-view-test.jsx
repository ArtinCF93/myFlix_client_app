import React from 'react';

class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.state = { //component stores values in its local state
            username: '',
            password: ''
        };

        // binding in the class constructor. So it can just esily be stated when used
        //The alternative way of using the => as used in the onMovieClick in main-view
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onUsernameChange(event) { //changes the state of the value input to whatever is yped into it
        this.setState({
            username: event.target.value
        });
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit() {
        let username = this.state.username;
        let password = this.state.password;
        console.log(username, password)
    }

    render() {
        return (
            <form>
                <label>
                    Username:
                    <input type="text" value={
                        this.state.username}
                        onChange={this.onUsernameChange} /> 
                </label> 
                <label>
                    Password:
                    <input type="text" value={
                        this.state.password}
                        onChange={this.onPasswordChange} />
                </label>
                <button type="button" onClick={this.handleSubmit}>Submit</button>
            </form>
        );
    }
}

export default LoginView