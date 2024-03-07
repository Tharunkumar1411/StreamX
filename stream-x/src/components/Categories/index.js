import CustomCard from "../CustomCard";
import Recents from "./Recents";
import {useSelector} from "react-redux"
import TrailerComponent from "../../components/TrailerComponent"

export default function Categories(){
    const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []
    const recentMovies = (movieList)?.slice(0, 3);
    return(
        <div className="m-2"> 
            <div>
                <div>
                    <TrailerComponent />
                </div>

                <div>
                    <h1 className="text-white mb-2 mt-4 font-bold">Recently viewed</h1>
                    <Recents header="tharun" subHeader="its hme jdklfs" data={recentMovies}/>
                </div>
                <div>
                    <h1 className="text-white mt-4 mb-2 font-bold">Favourites </h1>
                    <CustomCard type="fav"/>
                </div>

                <div>
                    <h1 className="text-white mt-4 mb-2 font-bold">Popular shows </h1>
                    <CustomCard type="poppular"/>
                </div>             
               
            </div>
        </div>
    )
}