import Recents from "./Recents";
import {useSelector} from "react-redux"

export default function Categories(){
    const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []
    const recentMovies = (movieList)?.slice(0, 3    );
    return(
        <div className="m-2"> 
            <div>
                <h1 className="text-white mb-2 font-bold">Recently viewed</h1>
                <Recents header="tharun" subHeader="its hme jdklfs" data={recentMovies}/>
            </div>
        </div>
    )
}