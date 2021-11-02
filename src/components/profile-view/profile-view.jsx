/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './profile-view.css'

// bootstrap import
import { Card, Button, Container, Form, Row, Col } from 'react-bootstrap';
// ProfileView is a low-level component.Here are user’s favorite movies are listed
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      Username: props.user.Username,
      Password: null,
      Email: props.user.Email,
      Birthday: props.user.Birthday
    };
  }


  deleteUser(e) {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://quiet-headland-10477.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log(`${username} was deleted`);
        alert("your profile is successfully deleted");
        window.open("/", "_self"); // Are is it better to use redirection this.componentDidmount here?
      })
      .catch((e) => {
        console.log("Error deleting User profile");
      });
  };

  removeFavMovie(id) {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    let movie = this.props.movies;

    axios.delete(`https://quiet-headland-10477.herokuapp.com/users/${Username}/movies/${id}` , {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      alert (`${movie.Title} was deleted from your Favorites`)
      window.location.reload();   
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  profileUpdate(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(`https://quiet-headland-10477.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        })
      .then((response) => {
        alert('your changes are saved!');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', response.data.Username);
        window.open(`/users/${response.data.Username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.setState({Username: input})
  }

  setPassword(input) {
    this.setState({Password: input})
  }

  setEmail(input) {
    this.setState({Email: input})
  }

  setBirthday(input) {
    this.setState({Birthday: input})
  }

  render() {
    let movies = this.props.movies;
    let user = this.props.user;

    return (
      <Container >
        <Card className="profile-container">
        <div className='profile-info'>
          <h3 className='profile-heading'>
            Collection and Settings of {user.Name}
          </h3>
          <Card.Body>
            <br />
            <Card.Text>
              Username: {user.Username}
            </Card.Text>
            <Card.Text>
              Email: {user.Email}
            </Card.Text>
            <Card.Text>
              Birthday: {user.Birthday}
            </Card.Text>
            <Card.Text>
                My Favorites:
            </Card.Text>
            <Card.Body>
              {user.FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}
                <Row className="favorites-movies ">
                  {user.FavoriteMovies.length > 0 &&
                    movies.map((movie) => {
                      if (movie._id === user.FavoriteMovies.find((fav) => fav === movie._id)) {
                        return (
                          <Col lg={4} key={movie._id}>
                            <Card className="favorites-item card-content" >
                              <Card.Img  className="movieCard" variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                              <Card.Body>
                                <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                                <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movie.title} onClick={() => this.removeFavMovie(movie._id)}>
                                  Remove
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        )}
                    })
                  }
                  </Row>
              </Card.Body>
          </Card.Body>
          </div>
            <h3>Change my profile settings:</h3>
            <Card.Body className="update">
              <Form className="update-form" onSubmit={(e) => this.profileUpdate(e)} >
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="form-label">Username:</Form.Label>
                  <Form.Control type="text" placeholder="Change Username" defaultValue={this.state.Username} onChange={(e) => this.setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control type="password" placeholder="Current or New Password" defaultValue="" onChange={(e) => this.setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control type="email" placeholder="New Email" value={this.state.Email} onChange={(e) => this.setEmail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" className="update-button" type="submit" size="md">
                  update settings
                </Button>
                <Button onClick={(e) => this.deleteUser(e)} variant="danger" className='delete-button'>delete account</Button>
              </Form>
            </Card.Body>
        </Card>
        <Link to="/">
          <Button variant="primary">Back to Movies</Button>
        </Link>
      </Container>
    );
  }
}