import { Box, IconButton } from "@mui/material";
import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (type) => {
        if(location.pathname !== '/streamX' && type === 'streamX'){
            navigate('/streamX')
        }

        if(type === 'favourites'){
            navigate('/favourites')
        }
    }
    return(
        <Box>
            <div className="flex flex-row text-white items-center justify-between m-2">
                <div className="flex flex-row cursor-pointer" onClick={() => handleClick('streamX')}>
                    <h1 className="ml-1 text-primary text-2xl font-serifpfa">StreamX</h1>
                </div>

                 <SearchBar />

                <IconButton onClick={() => handleClick('favourites')}>
                    <PlaylistAddIcon sx={{color:"red"}}/>
                </IconButton>
            </div>
            
            <Suspense>
                <Box>
                    <Outlet />
                </Box>
            </Suspense>
        </Box>
    )
}