// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// import './movie-card.css'

// class MovieCard extends React.Component {
//   render() {
//     let movieData = this.props.movieData;
//     let onMovieClick = this.props.onMovieClick;

//     // return <div className="movie-card" onClick={() => {
//     //     onMovieClick(movieData); //declaring an "on-click" action on movieData.title, below
//     // }}>{movieData.Title}</div>;

//     return(
//     //the card is set up by hiearchy
//     <Card className='card-container'> 
//         <Card.Body className='body-container'>
//           <Card.Img  className='image-container' src={movieData.ImagePath}/>
//             <Card.Title className='card-title'>{movieData.Title}</Card.Title>

//             <Button variant="outline-primary" onClick={() => onMovieClick(movieData)}>
//               Open
//             </Button>
//         </Card.Body>
//     </Card>
//     );
//   }
// }


// export default MovieCard;