import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import './profile-view.css';

export class ProfileView extends React.Component {

    componentDidMount() {
        let accessToken = localStorage.getItem('token'); //putting the token stored in the local storage of the browser
        if (accessToken !== null) { //if there is a token generated in the application console
            this.setState({
                user: localStorage.getItem('user')
            });
            this.removeFavMovie(accessToken);
        }
    }

    removeFavMovie() {
        const token = localStorage.getItem('token');
        const Username = localStorage.getItem('user');
        let movie = this.props.movies

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
    
    render(){
        let user = this.props.user;
        let onBackClick = this.props.onBackClick;
        let movie = this.props.movies;

        return (
            <Container className='ProfileView'>
                <Row className='justify-content-md-center'>
                    <Col>
                        <p>Username: {user.Username}</p>
                        <p>Email: {user.Email}</p>
                        <p>Birthday: {user.Birthday}</p>
                        <p>Favorite Movies: {user.FavoriteMovies}</p>
                    </Col>
                </Row>
                <Row>
            <Card.Body>
              {user.FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}
                <Row className="favorites-movies ">
                  {user.FavoriteMovies.length > 0 &&
                    movie.map((movie) => {
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
          </Row>
                <Button onClick={() => {
            onBackClick(null); //passing null on a click even, to go back to null
        }}>Back</Button>
            </Container>
        )
    }
}