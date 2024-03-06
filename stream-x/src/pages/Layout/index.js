import { Box, IconButton } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchBar from "../../components/SearchBar";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function Layout() {
    return(
        <Box>
            <div className="flex flex-row text-white items-center justify-between m-2">
                <div className="flex flex-row">
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