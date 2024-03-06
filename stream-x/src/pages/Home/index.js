import Categories from "../../components/Categories";
import SwiperCard from "../../components/Swiper";

export default function Home() {
   
    return(
        <div>
            <div className="flex justify-center items-center">
                <SwiperCard />
            </div>

            <Categories />
        </div>


    )
}