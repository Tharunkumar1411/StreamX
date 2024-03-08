import { Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../pages/Layout"
import { useDispatch } from "react-redux"
import { fetchMovieDetails } from "../store/actions/homeAction";
import Player from "../pages/Player"
import SearchResult from "../pages/SearchResult"
import Favourites from "../pages/Favourites"
import NotFoundPage from "../pages/404"
import StreamX from "../pages/StreamX"
import Home from "../pages/Home";

export default function AppRoutes() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchMovieDetails())
    }, [dispatch]);
    
    return(
        <Suspense>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/" element={<Layout />}>
                    <Route path="/streamX" element={<StreamX />} />
                    <Route path="/player" element={<Player />} />
                    <Route path="/searchResults" element={<SearchResult />} />
                    <Route path="/favourites" element={<Favourites />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}