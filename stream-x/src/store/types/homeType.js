export function getMovieDetails(data){
    return {
        type : "GET_MOVIES",
        payload: data
    }
}

export function setSearchResults(data){
    return {
        type: 'SET_SEARCH_RESULTS',
        payload: data
    }
}