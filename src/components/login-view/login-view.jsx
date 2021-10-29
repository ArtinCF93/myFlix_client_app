import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import img1 from '../../files/tv.png';

import { Link } from 'react-router-dom';

import './login-view.css';

export function LoginView(props) {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
//destructered, useState always returns an array with 2 values
//First value returns the current state, while the second value is a function that allows you to update your state
//the '' in useState('') is the intial value of your login variable
// in component class, this would look like below
// this.state = {
//     username: '',
//     password: ''


const handleSubmit = (e) => {
    e.preventDefault(); //preventing the default behavior
    /* Send a request to the server for authentication */
    axios.post('https://quiet-headland-10477.herokuapp.com/login', {
      Username: username, //passing the username and passowrd
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data); //his method triggers the onLoggedIn method of your “main-view.jsx” file 
    })
    .catch(e => {
      console.log('no such user')
    });
  };



//instead of having to write the behavior in the constructor class; a function is created within the onchange
//essentially the value starts with the current state of 'username' and changes to the target value of 'setUsername'
return (
    // <form>
    //     <label>
    //         Username:
    //         <input type="text" value={username}
    //         onChange={e => setUsername(e.target.value)} />
    //     </label>
    //     <label>
    //         Password:
    //         <input type="text" value={password}
    //         onChange={e => setPassword(e.target.value)} />
    //     </label>
    //     <button type="submit" onClick={handleSubmit}>Submit</button>
    // </form>
    <div className="base-container">
            <div className="content">
                    <img className = 'image' src={img1} alt=""/>
                    <div className="header"><h1>Login</h1></div>
                        <Form className='loginForm'>
                            <Form.Group className='userName' controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label className="form-label">Password:</Form.Label>
                                <Form.Control type="text"  onChange={e => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button className='btn' variant="primary" type="submit" onClick={handleSubmit}>
                                Login
                            </Button>
                            <Link to='/register'>  
                              <Button className='toBtn' variant="link">Or Sign Up</Button>
                            </Link>
                        </Form>
            </div>
    </div>
);
}

