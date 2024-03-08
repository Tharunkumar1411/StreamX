import React, { useRef } from 'react';
import trending1 from "../../assets/Images/trending1.png"
import trending2 from "../../assets/Images/trending2.png"
import trending3 from "../../assets/Images/trending3.png"
import trending4 from "../../assets/Images/trending4.png"
import trending5 from "../../assets/Images/trending5.png"
import trending6 from "../../assets/Images/trending6.png"
import trending7 from "../../assets/Images/trending7.png"

const TrendingCard = () => {
  let imgArray = [trending1,trending2,trending3,trending4,trending5,trending6,trending7];
  const subscribeRef = useRef();

  const handleClick = (data) => {
    subscribeRef.current?.openDialog?.(data)
  }
  return (
    <div className="flex flex-row gap-2 overflow-x-auto cursor-pointer">
      {imgArray.map((e,i) => (
        <div  
          key={i} 
          className="h-48 bg-cover bg-center" 
          style={{ flexShrink: 0, backgroundImage: `url(${e})`, width: "230px", height: "300px"}} 
          onClick={() => handleClick(e)}
        />
      ))}
    </div>
  );
};

export default TrendingCard;
