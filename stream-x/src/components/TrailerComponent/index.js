
import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';

export default function TrailerComponent(){
    const isMobile = useMediaQuery('(max-width:600px)');
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

    return(
        <div style={{ position: "relative", width: "100%", height: "50%" }}>
            <video src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"} autoPlay loop style={{ width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, padding: "10px", color: "white", marginBottom: isMobile ? 0 : 80 }}>
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