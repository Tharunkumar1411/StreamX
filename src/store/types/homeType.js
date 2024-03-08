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

export function setFavDetails(data){
    return{
        type: 'SET_FAV',
        payload: data
    }
}

export function updateFavDetails(data){
    return{
        type: 'UPDATE_FAV',
        payload: data
    }
}

export function removeFavDetails(data){
    return{
        type: 'REMOVE_FAV',
        payload: data
    }
}


export function setRecentViewed(data){
    return{
        type: 'SET_RECENT',
        payload: data
    }
}