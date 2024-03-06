import { Box, IconButton } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchBar from "../../components/SearchBar";
import NotificationIcon from '@mui/icons-material/NotificationsActiveOutlined';
export default function Layout() {
    return(
        <Box>
            <div className="flex flex-row text-white items-center justify-between m-2">
                <div className="flex flex-row">
                    <LiveTvIcon style={{color:"red"}}/> 
                    <h1 className="">StreamX</h1>
                </div>
                <div>
                    <SearchBar />
                </div>
                <div>
                    <IconButton>
                        <NotificationIcon sx={{color:"#73747E"}}/>
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