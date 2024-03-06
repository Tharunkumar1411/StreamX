import { getMovieDetails } from "../types/homeType";

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