import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export default function VideoPlayer(props) {
    const videoRef = useRef(null);
    const intervalRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [useNativeControls, setUseNativeControls] = useState(window.innerHeight < 767);

    useEffect(() => {
        const handleResize = () => {
            setUseNativeControls(window.innerWidth < 767);
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
        const handleFullScreenChange = () =>  setIsFullScreen(!!document.fullscreenElement);

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange)
        }
    },[])

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
        } else{
            if(document.exitFullscreen){
                document.exitFullscreen();
            } else if(document.mozCancelFullscreen){
                document.mozCancelFullscreen();
            } else if(document.webkitExitFullscreen){
                document.webkitExitFullscreen();
            } else if(document.msExitFullscreen){
                document.msExitFullscreen();
            }
        }
        setIsFullScreen(!isFullScreen)
    }

    const handleVolumeChange = (event) => {
        const newVolume = event.target.volume;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0)
    }


    const renderCustomControls = () => {
        return(
            <div>
                <IconButton onClick={playPause}>
                    {isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
                </IconButton>

                <IconButton onClick={stopVideo}> 
                    <StopIcon />
                </IconButton>

                <input type="range" min="0" max="100" value={progress} onChange={handleSeek}/>

                <IconButton onClick={toggleMute}>
                    {isMuted ? <VolumeOffIcon /> : <VolumeMuteIcon />}
                </IconButton>

                <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange}/>


                <IconButton onClick={toggleFullScreen}>
                    {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>

            </div>
        )
    }

    const updateProgress = () => {
        if(videoRef.current){
            const value = (videoRef.current.currentTime / videoRef.current.duration) * 100

            setProgress(value);
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
        <div>
           <video 
            className="player"
            style={{width: "640px"}}
            ref={videoRef}
            src={props?.data?.sources[0]}
            poster={`https://storage.googleapis.com/gtv-videos-bucket/sample/${props?.data?.thumb}`}
            onClick={playPause}
            onPlay={startProgressLoop}
            onPause={stopProgressLoop}
            controls={useNativeControls}
           />

           {!useNativeControls && renderCustomControls()}
           
        </div>
    )
}