import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img1 from '../../files/tv.png';

import './registration-view.css';

export function RegistrationView(props) {
    let [name, setName] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [email, setEmail] = useState('');
    let [birthday, setBirthday] = useState('');


const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, username, password, email, birthday);
    props.onSignedUp(username);
};


//instead of having to write the behavior in the constructor class; a function is created within the onchange
//essentially the value starts with the current state of 'username' and changes to the target value of 'setUsername'
return (
    <div className="base-container" ref={this.props.containerRef}>
            <div className="content">
                <div className="image">
                    <img src={img1} alt=""/>
                </div>
                    <div className="header">Or Sign Up</div>
                        <Form className='registrationForm'>
                            <Row className="mb-4">
                                <Form.Group as={Col} size="sm" controlId="formName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control size='sm' type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="signupUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control size='sm' type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="signupPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control size='sm' type="text" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                            </Row>

                            <Row className="justify-content-md-center">
                                    <Form.Group as={Col} controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control size='sm' type="email"  onChange={e => setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formBirthday">
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control size='sm' type="text"  onChange={e => setBirthday(e.target.value)} />
                                    </Form.Group>
                            </Row>    
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                        </Form>    
                </div> 
            </div>  
);
}