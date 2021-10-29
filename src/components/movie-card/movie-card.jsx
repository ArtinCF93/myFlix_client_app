import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';


import './movie-card.css'

class MovieCard extends React.Component {
  render() {
    let movie = this.props.movie;

    // return <div className="movie-card" onClick={() => {
    //     onMovieClick(movieData); //declaring an "on-click" action on movieData.title, below
    // }}>{movieData.Title}</div>;
    
    return (
      //the card is set up by hiearchy
      <div>
        <Card className='card-container'>
          <Card.Body className='body-container'>
            <Card.Img className='image-container' src={movie.ImagePath} />
            <Card.Title className='card-title'>{movie.Title}</Card.Title>

            {/* Button that takes you to the path destination; identifies entry of parameter (title of the movie)*/}
            <Link to={`/movies/${movie.Title}`}>
              <Button variant="primary">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}


export default MovieCard;