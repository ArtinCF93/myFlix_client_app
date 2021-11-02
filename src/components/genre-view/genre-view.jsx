import React from 'react';
import Button from 'react-bootstrap/Button';

class GenreView extends React.Component{

  componentDidMount() {
    let accessToken = localStorage.getItem('token'); //putting the token stored in the local storage of the browser
    let genreId = this.props.genreId;
    this.props.getGenre(accessToken, genreId)
    }

   render() {
   let genre = this.props.genre;
   let onBackClick = this.props.onBackClick;

   if (!genre) {
    return <div>...loading</div>}

   return (
    <div className="movie-view">
              <div className="genre-name">
                <span className="value">{genre.Name}</span>
              </div>
              <div className="genre-description">
                <span className="value">{genre.Description}</span>
              </div>
              <Button onClick={() => {
                onBackClick(null); //passing null on a click even, to go back to null
              }}>Back</Button>
      </div>   
      //test  
   )
 }
}

export default GenreView;