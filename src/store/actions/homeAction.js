import { getMovieDetails, removeFavDetails, searchFavDetails, setFavDetails, setRecentViewed, setSearchResults, updateFavDetails } from "../types/homeType";

export function fetchMovieDetails() {
    return (dispatch) => {
        fetch("https://gist.githubusercontent.com/jsturgis/3b19447b304616f18657/raw/a8c1f60074542d28fa8da4fe58c3788610803a65/gistfile1.txt")
        .then((res) => res.text())
        .then((data) => {
            const jsonData = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
            
            try {
                const parsedData = JSON.parse(jsonData);
                dispatch(getMovieDetails(parsedData?.categories?.[0]));
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
}

export function setSearchResult(data){
    return(dispatch) => {
        dispatch(setSearchResults(data))
    }
}


export function setRecentView(data){
    return(dispatch) => {
        dispatch(setRecentViewed(data))
    }
}

export function setFavourites(data){
    return(dispatch) => {
        dispatch(setFavDetails(data))
    }
}

export function searchFavourites(data){
    return(dispatch) => {
        dispatch(searchFavDetails(data))
    }
}

export function updateFavourites(data){
    return(dispatch) => {
        dispatch(updateFavDetails(data))
    }
}

export function removeFavourites(data){
    return(dispatch) => {
        dispatch(removeFavDetails(data))
    }
}