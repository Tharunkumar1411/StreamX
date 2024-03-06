import React from "react";
import { Swiper, SwiperSlide} from "swiper/react";
import { EffectCoverflow, Pagination } from 'swiper/modules';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import {useSelector} from "react-redux"

import 'swiper/css/effect-cards';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './index.css';
import { IconButton } from "@mui/material";

export default function SwiperCard(){
    const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []
    const priorityMovies = (movieList)?.slice(0, 5);
    console.log("it here::", priorityMovies)
    
    return(
        <div className="mt-10 static">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            className="pb-50 pt-50"
            pagination={true}
            loop={true}
            style={{"--swiper-pagination-color": "#FF0000","--swiper-pagination-bullet-inactive-color": "#fff"}}
            modules={[EffectCoverflow, Pagination]}
            initialSlide={3}
        >   

           <div className="flex justify-center items-cente">
            {priorityMovies?.map((video, index) => (
                    <SwiperSlide key={index} className="" style={{ backgroundImage: `url('https://storage.googleapis.com/gtv-videos-bucket/sample/${video?.thumb}')` }}>
                        <div className="absolute bottom-8 left-0 right-0 flex flex-row justify-between bg-gray-800 m-2">
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                <h1 className="text-white font-semibold	">{video?.title}</h1>
                            </div>
                            <div className="border-1 border-primary bg-primary rounded-full">
                                <IconButton size="small">
                                    <PlayArrowRoundedIcon sx={{ color: "#fff" }} />
                                </IconButton>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
           </div>
        </Swiper>
        </div>
    )
}