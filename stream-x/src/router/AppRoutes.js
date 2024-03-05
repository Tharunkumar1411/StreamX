import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../pages/Layout"
import Home from "../pages/Home"

export default function AppRoutes() {
    return(
        <Suspense>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </Suspense>
    )
}