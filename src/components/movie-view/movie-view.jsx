import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { Link } from 'react-router-dom';

import './movie-view.css';

class MovieView extends React.Component {

    // componentDidMount() {
    //     let accessToken = localStorage.getItem('token');
    //     let movie = this.props.movie;
    //     this.props.addFav(accessToken, movie)
    //     }

    addFavMovie() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        let movie = this.props.movie;
        axios({
          method: 'post',
          url: `https://theflix.herokuapp.com/users/${Username}/movies/${movie._id}`,
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(() => {
            alert(`${movie.Title} was added to your Favorites`);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    

    keypressCallback(event) { //created function to document the key that is pressed
        console.log(event.key);
    }

    componentDidMount() { //function that listens to the "keypress" event and initiates "keypressCallback" function upon initiation, when component has displayed
        document.addEventListener('keypress', this.keypressCallback);    }

    componentWillUnmount() { //function that removes the created event listener upon "unmounting" or backing out of displayed component
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render(){
        let movie = this.props.movie;
        let onBackClick = this.props.onBackClick;

        return (
        <div>
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="value">{movie.Description}</span>
                </div>
                <Button onClick={() => {
                    onBackClick(null); //passing null on a click even, to go back to null
                }}>Back</Button>
                <br></br>
                <Link to={`/directors/${movie.Director}`}>
                    <Button variant="outline-secondary">Director Info</Button>
                </Link>
                <br></br>
                <Link to={`/genres/${movie.Genre}`}>
                    <Button variant="outline-secondary">Genre Info</Button>
                </Link>
                <br></br>
                <Button variant='danger' className="fav-button" value={movie._id} 
                    onClick={() => this.addFavMovie()}>
                         Add to Favorites
                </Button>
            </div>
        </div>
        );
    }
}

export default MovieView;