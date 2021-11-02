import {combineReducers} from 'redux';

import {
    SET_MOVIES,
    SET_FILTER,
    SET_USERS,
} from '../actions/actions';

//this is a reducer function; each function takes a state and action; if the action applies, it changes the state
//visibilityFilter(state='', action) is its signature or identity card.
function visibilityFilter(state='', action){
    switch(action.type) { //the switch statement either returns SET_FILTER action.values or its current(default) unchanged state
        case SET_FILTER:
            return action.value;
        default: return state;
    }
}

function movies(state=[], action){//the state is initialized to an array, because the list is wihin a array
    switch(action.type){
        case SET_MOVIES:
            return action.value
        default: return state;
    }
}

function users(state=[], action){
    switch(action.type){
        case SET_USERS:
            return action.value
        default: return state;
    }
}

let moviesApp = combineReducers({ //groups both reducers together and only passes them the state that applies
        visibilityFilter,
        movies,
        users
     });

 export default moviesApp;