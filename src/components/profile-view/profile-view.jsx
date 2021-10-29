/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

// bootstrap import
import { Card, Button, Container, Form, Row, Col } from 'react-bootstrap';
// ProfileView is a low-level component.Here are user’s favorite movies are listed
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      favorites: [],
      movies: [],
      users: [],
    };
  }


  deleteUser(e) {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://myflix-movie.herokuapp.com/users/${username}`, {
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

  removeFavMovie() {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    let movie = this.state.movies;

    axios.delete(`https://theflix.herokuapp.com/users/${Username}/movies/${movie._id}` , {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      alert (`${movie.Title} was added to your Favorites`)
      window.location.reload();   
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  profileUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(`https://myflix-movie.herokuapp.com/users/${username}`,
        {
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
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
        localStorage.setItem('user', this.state.Username);
        window.open(`/client/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  render() {
    let movies = this.props.movies;
    let user = this.props.user;

    return (
      <Container className="profile-update-container">
        <Card
          className="border-color text-white bg-dark mb-3"
        >
          <h3>
            Collection and Settings of
            <br />
            {user.Name}
          </h3>
          <Card.Body>
            <br />
            <Card.Text>
              Username:
              {user.Username}
            </Card.Text>
            <Card.Text>
              Email:
              {user.Email}
            </Card.Text>
            <Card.Text>
              Birthday:
              {user.Birthday}
            </Card.Text>
            <Card.Text>
              <h3>
                My Favorites:
              </h3>
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
          <Card.Text>
            <h3>Change my profile settings:</h3>
            <Card.Body className="update">
              <Form className="update-form" onSubmit={(e) => this.profileUpdate(e, this.Username, this.Password, this.Email, this.Birthday)} >
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="form-label">Username:</Form.Label>
                  <Form.Control type="text" placeholder="Change Username" defaultValue={user.Username} onChange={(e) => this.setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control type="password" placeholder="Current or New Password" defaultValue="" onChange={(e) => this.setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control type="email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} />
                </Form.Group>
                <Button variant="primary" className="update-button" type="submit" size="md">
                  update settings
                </Button>
                <Button onClick={(e) => this.deleteUser(e)} variant="danger" className='delete-button'>delete account</Button>
              </Form>
            </Card.Body>
          </Card.Text>
        </Card>
        <Link to="/">
          <Button variant="primary">Back to Movies</Button>
        </Link>
      </Container>
    );
  }
}