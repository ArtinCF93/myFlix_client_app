import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../../movie-card/movie-card';

import './movie-list.css'

//visibilityFilter is extracted into a prop
let mapStateToProps = state => {
    const { visibilityFilter } = state;
  return { visibilityFilter };
}

function MovieList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    //the movies array can be filtered on the value present in visibilityFilter
    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className='main-view' />;

    return <div>
                <Col md={12} className='filter d-flex justify-content-center'>
                    <VisibilityFilterInput 
                        visibilityFilter={visibilityFilter} />
                </Col>

                <div>
                    <Row className='movielist-row'>
                        {filteredMovies.map(m => (
                        <Col className='d-flex justify-content-center' md={4} key={m._id}>
                            <MovieCard //name on the left is the name of the prop
                                movie={m} />
                        </Col>
                        ))}
                    </Row>
                </div>
            </div>
    }

// The first argument, mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will use
    export default connect(mapStateToProps)(MovieList);