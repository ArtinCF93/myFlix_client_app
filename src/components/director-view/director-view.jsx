import React from 'react';
import Button from 'react-bootstrap/Button';

class DirectorView extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let directorId = this.props.directorId;
    this.props.getDirector(accessToken, directorId)
  }

  render() {
    let director = this.props.director;
    let onBackClick = this.props.onBackClick;

    if (!director) {
      return <div>...loading</div>
    }

    return (
      <div className="movie-view">
        <div className='director-name'>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-biography">
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="value">{director.Birth}</span>
        </div>
        <Button onClick={() => {
          onBackClick(null); //passing null on a click even, to go back to null
        }}>Back</Button>
      </div>
    )
  }
}

export default DirectorView;