import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LiveTvIcon from '@mui/icons-material/LiveTv';
export default function Layout() {
    return(
        <Box className="m-5 bg-slate-900">
            <div style={{color:"purple"}} className="flex flex-1 m-2 pt-5">
               <LiveTvIcon />
               <h2 className="pl-2 pt-0.5">SteamX</h2>
            </div>
            <Suspense>
                <Box>
                    <Outlet />
                </Box>
            </Suspense>
        </Box>
    )
}