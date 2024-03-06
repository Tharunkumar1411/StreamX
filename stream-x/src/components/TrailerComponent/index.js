
import { Button, useMediaQuery } from '@mui/material'
// import { useSelector } from 'react-redux'
export default function TrailerComponent(){
    // const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []
    const isMobile = useMediaQuery('(max-width:600px)');

    return(
        <div style={{ position: "relative", width: "100%", height: "50%" }}>
            <video src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"} autoPlay loop muted style={{ width: "100%", height: "100%" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, padding: "10px", color: "white", marginBottom: isMobile ? 0 : 80 }}>
                <div className="flex flex-col gap-4">
                    <div className={`text-center ${isMobile ? 'hidden' : 'block'}`}>
                        <h1 className='text-4xl'>
                            StreamX <span style={{ color: "goldenrod" }}>Specials</span>
                        </h1>
                        <h2 className='text-6xl'>Elephant Dream</h2>
                    </div>

                    <h4 className={isMobile ? 'hidden' : 'block'}>By Blender Foundation</h4>
                    <p className={isMobile ? 'hidden' : 'block'}>The first Blender Open Movie from 2006</p>
                    <Button sx={{backgroundColor: "#222", color:"white", opacity: "0.8", fontWeight:"bold"}}>Watch Now</Button>
                </div>
            </div>
        </div>

    )
}