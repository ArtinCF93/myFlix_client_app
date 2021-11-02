export let SET_MOVIES = 'SET_MOVIES';
export let SET_FILTER = 'SET_FILTER';
export let SET_USERS = 'SET_USERS';


//initializes the movie list, action creator
export function setMovies(value){
    return {type: SET_MOVIES, 
            value
    };
}

//to filter the movie list
export function setFilter(value){
    return {type: SET_FILTER, 
            value
    };
}

export function setUsers(value){
    return {type: SET_USERS,
            value
    };
}