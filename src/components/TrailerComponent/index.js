
import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { useEffect, useRef } from 'react';

export default function TrailerComponent(){
    const isMobile = useMediaQuery('(max-width:600px)');
    const videoRef = useRef(null);

    const playerData = {
        "description": "The first Blender Open Movie from 2006",
        "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        ],
        "subtitle": "By Blender Foundation",
        "thumb": "images/ElephantsDream.jpg",
        "title": "Elephant Dream"
    }
    const navigate = useNavigate();

    useEffect(() => {
        if (videoRef.current) {
            // Set starting current time to 30 seconds (for example)
            videoRef.current.currentTime = 10;
        }
    }, []);

    return(
        <div className="relative w-full h-1/2">
            <video ref={videoRef} src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"} autoPlay loop style={{ width: "100%", height: "100%" }} />
            <div className={`absolute bottom-0 left-0 p-2 text-white ${isMobile ? 'mb-0' : 'mb-10'}`}>
                <div className="flex flex-col gap-4">
                    <div className={`text-center ${isMobile ? 'hidden' : 'block'}`}>
                        <h1 className='text-4xl font-serif'>
                            StreamX <span style={{ color: "goldenrod" }}>Specials</span>
                        </h1>
                        <h2 className='text-6xl font-serif'>Elephant Dream</h2>
                    </div>

                    <h4 className={isMobile ? 'hidden' : 'block'}>By Blender Foundation</h4>
                    <p className={isMobile ? 'hidden' : 'block'}>The first Blender Open Movie from 2006</p>
                    <CustomButton name="Watch Now" func={() => navigate('/player', {state: {playerData}})}/>
                </div>
            </div>
        </div>
    )
}