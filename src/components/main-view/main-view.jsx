//import React to use library
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//import the action
import {setMovies, setUsers} from '../../actions/actions';

import MovieList from '../redux/movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
//LoginView is imported with {} because we did not default export it from the file

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../nav-view/nav-view';


import Col from 'react-bootstrap/Col';

import './main-view.css';


//declare a class named Mainview and extend it to react
//You’re essentially telling React to create a new MainView component using the generic React.Component template as its foundation.
//contructing the component (the elements)
class MainView extends React.Component {

    // Creating a state object with a constructor
    constructor() {
        super(); //use super() to initializes component state for use
        this.state = { //basiclly the variable
            // movies: [], //this is to reference how these varables start out. Movies for example starts as an empty array and will change later by the getMovies function.
            currentDirector: null,
            currentGenre: null,
            user: null,
            // users: [],
        }
    }

    //behavior
    //when a user successfully logs in, this function updates the user property in state
    onLoggedIn(authData) {
        console.log(authData);
        // this.setState({
        //     user: authData.user.Username //saved in the user state.
        // });
        this.props.setUsers(authData);
        // The auth information received from the handleSubmit method—the token and the user—is saved in localStorage
        localStorage.setItem('token', authData.token); //localStorage has a setItem method that accepts two arguments: a key and a value.
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token); //triggered by the function below to get the list of movies
    }

    onSignedUp(authData) {
        console.log(authData);
        alert('Thank you for Registering! You will now be returned to the Login page to Sign in');
        window.open('/', '_self');
        // this.setState({
        //     user: authData.user.Username //saved in the user state.
        // });
        this.props.setUsers(authData);
        // The auth information received from the handleSubmit method—the token and the user—is saved in localStorage
        localStorage.setItem('token', authData.token); //localStorage has a setItem method that accepts two arguments: a key and a value.
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token); //triggered by the function below to get the list of movies
    }

    getMovies(token) {
        axios.get('https://quiet-headland-10477.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //Asign the result to the state
                // this.setState({
                    // movies: response.data
                // });
                this.props.setMovies(response.data);//function from actions is passed as a prop for the response data
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getDirector(token, id) {
        axios.get(`https://quiet-headland-10477.herokuapp.com/directors/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    currentDirector: response.data 
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getGenre(token, id) {
        axios.get(`https://quiet-headland-10477.herokuapp.com/genres/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => { 
                //Asign the result to the state. Turning it from null to a data value (whatever is in the database)
                this.setState({
                    currentGenre: response.data //the response is the individual data of the individual collection with the ID indictaed in the paramter
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUsers(token){
        axios.get('https://quiet-headland-10477.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // this.setState({
                //     users: response.data
                // });
                this.props.setUsers(response.data);
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token'); //putting the token stored in the local storage of the browser
        if (accessToken !== null) { //if there is a token generated in the application console
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUsers(accessToken);
        }
    }


    render() { //implement a render method to render below code on screen
        // let movies = this.state.movies;
        let movies = this.props.movies;//setMovies will be connected to the MainView through this prop
        let user = this.state.user;
        let users = this.props.users;
        // let users = this.state.users;
        let currentDirector = this.state.currentDirector;
        let currentGenre = this.state.currentGenre; //storing response data in variable

        return (
            <div>

                <Router>
                    {  user && <NavBar user ={user}/> }
                    {/* MovieCard view */}
                    <Route exact path="/" render={() => {
                        if (!user) return <div>
                            <LoginView //LoginView is imported to MainView to pass the user details to LoginView
                                onLoggedIn={user => this.onLoggedIn(user)}
                            />
                        </div>
                        if (movies.length === 0) {
                            return <div>...loading</div>;
                        }
                        // return movies.map(m => (
                        //     <Col className='d-flex justify-content-center' md={3} key={m._id}>
                        //         <MovieCard //name on the left is the name of the prop
                        //             movie={m} />
                        //     </Col>
                        // ))
                        return  <MovieList
                                    movies={movies}//the movies prop is passed to MovieList as a prop of the same name, movies
                                />
                    }} />
                    {/* Register view */}
                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView
                                onSignedUp={user => this.onSignedUp(user)}
                            />
                        </Col>
                    }} />
                    {/* Movie view */}
                    <Route path="/movies/:Title" render={({ match, history }) => { //match and history are built in methods, must be stated to be used
                        if (!user) return <div>
                            <LoginView //LoginView is imported to MainView to pass the user details to LoginView
                                onLoggedIn={user => this.onLoggedIn(user)}
                            />
                        </div>
                        if (movies.length === 0) {
                            return <div>...loading</div>;
                        }
                        return <Col className='d-flex justify-content-center'>
                            <MovieView //will find the movie and display the movie that matches the title url parameter (param)
                                movie={movies.find(m => m.Title === match.params.Title)}
                                onBackClick={() => history.goBack()}
                            />
                        </Col>
                    }} />
                    {/* Director view */}
                    <Route path="/directors/:id" render={({ match, history }) => {
                        if (!user)
                            return (
                                <Col>
                                    <LoginView 
                                        onLoggedIn={(user) => this.onLoggedIn(user)} />
                                </Col>
                            );
                        return <Col className='d-flex justify-content-center'>
                            <DirectorView 
                                directorId={match.params.id}
                                director={currentDirector}
                                getDirector={(token, id) => this.getDirector(token, id)}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/genres/:id" render={({ match, history }) => {
                        if (!user)
                            return (
                                <Col>
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                </Col>
                            );
                        if (movies.length === 0) return <div>...loading</div>;
                        return <Col className='d-flex justify-content-center'>
                            <GenreView
                                genreId={match.params.id} //matching the value of the paramter and storing it in a variable
                                genre={currentGenre} //storing the response data as a prop
                                getGenre={(token, id) => this.getGenre(token, id)} //this arrow function is what is being called into the prop Genreview
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/users/:Username" render={({match, history}) => {
                        if (!user) return <LoginView
                            onLoggedIn={user => this.onLoggedIn(user)} />
                        if (movies.length === 0 || users.length === 0) {
                            return <div>...loading</div>;
                        }
                        return <Col className='movieView d-flex justify-content-center'>
                        <ProfileView
                            movies={movies}
                            user={users.find(u => u.Username === match.params.Username)}
                            onBackClick={() => history.goBack()}
                        />
                     </ Col>
                    }} />
                </Router>
            </div>
        );
    }
}


//will allow the component (the one you want to connect) to subscribe to store updates. Any time the store is updated, this function will be called.
//takes a state as an arguement and returns the new props for the component, global state
let mapStateToProps = state => {
    return { 
        movies: state.movies,
        users: state.users }
  }


//can only export one item using the default keyword. Otherwise use export before a class statement
// export default MainView
export default connect(mapStateToProps, { setMovies, setUsers } )(MainView);
// First, the movies state is extracted from the store through the connect() function, before being passed as the movies prop for the MainView component.
//the connect() function is meant to wrap any stateful componenet to a connect it to a store