import CustomCard from "../CustomCard";
import Recents from "./Recents";
import {useSelector} from "react-redux"
import TrailerComponent from "../../components/TrailerComponent"
import Loader from "../../components/Loader/index.js";
import TopMovieCard from "../TopMovieCard/index.js";

export default function Categories(){
    const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []
    const recentViewd = useSelector(state => state?.home?.movieList?.recentViewed?.[0])
    const favourites = useSelector(state => state?.home?.movieList?.favourites?.[0])
    const isLoading = useSelector(state => state?.home?.movieList?.videos)
    console.log("fdsfjdsf::", isLoading)
    const recentMovies = (movieList)?.slice(0, 3);
    return(
        <>
        {!isLoading?.length ? <Loader from="categories"/> :
        <div className="m-2"> 
            <div>
                <div>
                    <TrailerComponent />
                </div>

                {recentViewd &&
                    <div>
                        <h1 className="text-white mb-2 mt-4 font-bold">Recently viewed</h1>
                        <Recents header="tharun" subHeader="its hme jdklfs" data={recentMovies}/>
                    </div>
                }

                {favourites &&
                    <div>
                        <h1 className="text-white mt-4 mb-2 font-bold">Favourites </h1>
                        <CustomCard type="fav"/>
                    </div>
                }

                <div>
                    <h1 className="text-white mt-4 mb-2 font-bold">Top Movies </h1>
                    <TopMovieCard type="trending"/>
                </div>

                <div>
                    <h1 className="text-white mt-4 mb-2 font-bold">Popular shows </h1>
                    <CustomCard type="poppular"/>
                </div>             
               
            </div>
        </div>}
        </>

    )
}