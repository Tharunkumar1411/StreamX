export function getMovieDetails(data){
    return {
        type : "GET_MOVIES",
        payload: data
    }
}