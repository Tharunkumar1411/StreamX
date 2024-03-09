import { useLocation } from "react-router-dom"
import VideoPlayer from "../../components/VideoPlayer";
import { useEffect, useState } from "react";

export default function Player() {
    const location = useLocation();
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        if(location?.state?.playerData){
            setVideoData(location?.state?.playerData)
        }
    },[location])
    return(
        <div className="w-full h-96 mx-auto">
           <VideoPlayer data={videoData} />
        </div>
    )
}