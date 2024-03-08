import { Button, IconButton, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useDispatch, useSelector } from "react-redux";
import { setFavourites, setRecentView } from "../../store/actions/homeAction";

export default function VideoPlayer(props) {
    const videoRef = useRef(null);
    const intervalRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFav, setIsFav] = useState(false)
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch();
    // const [useNativeControls, setUseNativeControls] = useState(true);
    const favourites = useSelector(state => state?.home?.movieList?.favourites) ?? []

    useEffect(() => {
       if(props?.data?.type === 'recent'){
            videoRef.current.currentTime = props?.data?.time
            setProgress(props?.data?.progress)
       }
    }, [props])

    useEffect(() => {
        const handleResize = () => {
            // setUseNativeControls(window.innerWidth < 767);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[]);

    useEffect(() => {
        const video = videoRef.current;

        const handleVideoEnd = () => {
            setIsPlaying(false);
            setProgress(0);
            stopProgressLoop();
        };

        if(video){
            window.addEventListener('ended', handleVideoEnd);
        }

        return () => {
            if(video){
                window.removeEventListener("ended", handleVideoEnd)
            }
            stopProgressLoop();
        }
    },[]);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
            // setUseNativeControls(!!document.fullscreenElement || window.innerWidth < 767);
        };
    
        document.addEventListener('fullscreenchange', handleFullScreenChange);
    
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    useEffect(() => {
        setIsFav(favourites.some(item => (item.title === props?.data?.title)))
    },[props])



    const stopVideo = () => {
        if(videoRef.current){
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }

    const handleSeek = (event) => {
        const seekTo = (event.target.value / 100) * (videoRef.current.duration);
        videoRef.current.currentTime = seekTo;
        setProgress(event.target.value)
    }

    const toggleMute = () => {
        const currentVolume = videoRef.current.volume;

        if(currentVolume > 0){
            videoRef.current.volume  = 0;
            setVolume(0);
            setIsMuted(true)
        } else{
            videoRef.current.volume  = 1;
            setVolume(1);
            setIsMuted(false)
        }
    }

    const toggleFullScreen = () => {
        if(!isFullScreen){
            if(videoRef.current.requestFullScreen){
                videoRef.current.requestFullScreen();
            } else if(videoRef.current.mozRequestFullScreen){
                videoRef.current.mozRequestFullScreen();
            } else if(videoRef.current.webkitRequestFullScreen){
                videoRef.current.webkitRequestFullScreen();
            } else if(videoRef.current.msRequestFullScree){
                videoRef.current.msRequestFullScree();
            }
        }
        setIsFullScreen(!isFullScreen)
    }
    const handleVolumeChange = (event) => {
        let newVolume = parseFloat(event.target.value);
        newVolume = isNaN(newVolume) ? 1 : Math.max(0, Math.min(1, newVolume)); // Ensure volume is between 0 and 1
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }
    

    const renderCustomControls = () => {
        return(
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={playPause} sx={{ color: 'white' }}>
                        {isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
                    </IconButton>
            
                    <IconButton onClick={stopVideo} sx={{ color: 'white' }}> 
                        <StopIcon />
                    </IconButton>
            
                    <input type="range" min="0" max="100" value={progress} onChange={handleSeek} className="w-24 "/>
            
                    <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
                        {isMuted ? <VolumeOffIcon /> : <VolumeMuteIcon />}
                    </IconButton>
            
                    <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} className="w-24"/>
                </div>
        
                <IconButton onClick={toggleFullScreen} sx={{ color: 'white' }}>
                    <FullscreenIcon />
                </IconButton>
        </div>
        
        )
    }

    const updateProgress = () => {
        if(videoRef.current){
            const value = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setProgress(value);
            let videoData = [{
                ...props?.data,
                time: videoRef.current.currentTime,
                duration: videoRef.current.duration,
                progress: value,
                type: 'recent'
            }]

            dispatch(setRecentView(videoData))
        }
    }

    const startProgressLoop = () => {
        if(intervalRef.current){
            clearInterval(intervalRef.current)
        }

        intervalRef.current = setInterval(() => {
            updateProgress()
        }, 1000);
    }

    const stopProgressLoop = () => {
        if(intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null
        }
    }

    const playPause = () => {
        if(videoRef.current){
            if(videoRef.current.paused){
                videoRef.current.play();
                setIsPlaying(true);
                startProgressLoop();
            }else{
                videoRef.current.pause();
                setIsPlaying(false);
                stopProgressLoop()
            }
        }
    }

    return(
        <div style={{ }} className="w-full h-full">
            <video
                className="w-full h-full"
                ref={videoRef}
                src={props?.data?.sources[0]}
                poster={`https://storage.googleapis.com/gtv-videos-bucket/sample/${props?.data?.thumb}`}
                onClick={playPause}
                onPlay={startProgressLoop}
                onPause={stopProgressLoop}
            />

            { renderCustomControls()}


            <div className={`flex flex-col gap-4 ${isMobile ? 'w-full' : 'w-3/2'} ml-4 mt-2`}>

                {!isFav &&
                <Button 
                    onClick={() => dispatch(setFavourites(props?.data))}
                    sx={{backgroundColor: "#222", width:"fit-content", color:"white", opacity: "0.8", fontWeight:"bold"}}
                >
                    Add To Fav
                </Button> }

                <div className="mt-4 flex flex-col gap-8 mb-2 text-white">
                    <h1 style={{ fontFamily: "Cantarell" }}><span className="font-extrabold">Title:</span> {props?.data?.title}</h1>
                    <h1 style={{ fontFamily: "Cantarell" }}><span className="font-extrabold">SubTitle:</span> {props?.data?.subtitle}</h1>
                    <h1 style={{ fontFamily: "Cantarell" }}><span className="font-extrabold">About:</span> {props?.data?.description}</h1>
                </div>
            </div>
        </div>

    )
}