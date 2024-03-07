import CustomCard from "../../components/CustomCard";
import SwiperCard from "../../components/Swiper";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function SearchResult() {
    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const searchResults = useSelector(state => state?.home?.movieList?.searchResults) ?? location?.state?.selectedResult

    useEffect(() => {
        if(searchResults){
            setSearchData({...searchData, selectedResults: [searchResults]})
        }
    },[searchResults]);

    return(
        <div className="text-white m-2">
            <SwiperCard />
            <h1 className="m-2 font-extrabold" style={{fontFamily: "Cantarell"}}>Search Result</h1>

            <div className={`m-2 w-full flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
                <CustomCard data={searchData} />

                <div className={`flex flex-row gap-4 ${isMobile ? 'w-full' : 'w-3/6'}`}>
                    <div className={`${isMobile ? 'mt-4'  : 'ml-8'} flex flex-col gap-8`}>
                        <h1 style={{ fontFamily: "Cantarell" }}><span className="font-extrabold">Title:</span> {searchData?.selectedResults?.[0]?.title}</h1>
                        <h1 style={{ fontFamily: "Cantarell" }}><span className="font-extrabold">SubTitle:</span> {searchData?.selectedResults?.[0]?.subtitle}</h1>
                        <h1 style={{ fontFamily: "Cantarell" }}><span className="font-extrabold">About:</span> {searchData?.selectedResults?.[0]?.description}</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}