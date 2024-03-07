import { Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../pages/Layout"
import Home from "../pages/Home"
import { useDispatch } from "react-redux"
import { fetchMovieDetails } from "../store/actions/homeAction";
import Player from "../pages/Player"
import SearchResult from "../pages/SearchResult"

export default function AppRoutes() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchMovieDetails())
    }, [dispatch]);
    
    return(
        <Suspense>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/player" element={<Player />} />
                    <Route path="/searchResults" element={<SearchResult />} />
                </Route>
            </Routes>
        </Suspense>
    )
}