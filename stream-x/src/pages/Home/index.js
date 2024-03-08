
import { Button } from "@mui/material"
import BgImage from "../../assets/Images/homeBg.jpg"
import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate();

    return(
        <>
        <div className="relative h-screen">
            <div className="absolute inset-0 bg-cover bg-center bg-black opacity-20" style={{ backgroundImage: `url(${BgImage})` }}/>
                <div className="flex flex-row cursor-pointer mt-4 ml-4" onClick={() => handleClick('streamX')}>
                <h1 className="text-primary text-4xl">StreamX</h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
          
            <div className="text-white text-center w-full md:w-3/4 lg:w-1/2">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                    Infinite access,
                    <br className="md:hidden lg:inline" />
                    television series, and additional content.
                </h1>
                <p className="mt-2">Explore our amazing content!</p>
                <Button sx={{backgroundColor: "#FF0000", color:"white", marginTop: "10px", opacity: "0.8", fontWeight:"bold"}} onClick={() => navigate('/streamX')}>Get Started</Button>
            </div>
            </div>
        </div>

        {/* <div className="h-screen text-white bg-black">
            <h1>add oem content</h1>
        </div> */}
        </>

    )
}