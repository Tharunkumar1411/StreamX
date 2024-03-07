import { Box, IconButton } from "@mui/material";
import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchBar from "../../components/SearchBar";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        if(location.pathname !== '/home'){
            navigate('/home')
        }
    }
    return(
        <Box>
            <div className="flex flex-row text-white items-center justify-between m-2">
                <div className="flex flex-row cursor-pointer" onClick={handleClick}>
                    <LiveTvIcon style={{color:"red"}}/> 
                    <h1 className="ml-2">StreamX</h1>
                </div>
                <div>
                    <SearchBar />
                </div>
                <div>
                    <IconButton>
                        <PlaylistAddIcon sx={{color:"#73747E"}}/>
                    </IconButton>
                </div>
            </div>
            
            <Suspense>
                <Box>
                    <Outlet />
                </Box>
            </Suspense>
        </Box>
    )
}