import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { setFavourites } from '../../store/actions/homeAction';
import CustomButton from '../CustomButton';

export default function CustomCard(props) {
  const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []
  const favourites = useSelector(state => state?.home?.movieList?.favourites) ?? []
  const [mapData, setMapData] = React.useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (playerData) => {
    navigate("/player", {state: {playerData}})
  }

  React.useEffect(() => {
    if(props?.data?.selectedResults){
      setMapData(props?.data?.selectedResults)
    }else if(props?.type === 'fav'){
      setMapData(favourites);
    }else{
      setMapData(movieList);
    }
  },[props])

  const isFavourites = (data) => {
    return favourites.some(item => (item.title === data?.title))
  }
  React.useEffect(() => {
  },[props])

  
  return (
    <div className='flex flex-row overflow-x-auto gap-2 cursor-pointer'>
    {(mapData?.map((data,i) => (
      <Card 
        sx={{ maxWidth: 230, height: (props?.type === 'fav') ? 150 : 320, flexShrink: 0, display: 'flex', flexDirection: 'column', '&:hover': {
          border: '1px solid #fff'
        },  border: '1px solid #222' }} 
        key={i} 
        style={{backgroundColor: 'rgba(34,34,34,0.8'}}>
        <CardMedia
          component="img"
          alt="custom thumb"
          sx={{ width: 361, height: 'fit-content' }}
          image={`https://storage.googleapis.com/gtv-videos-bucket/sample/${data?.thumb}`}
          onClick={() => handleClick(data)}
        />
        {props?.type !== 'fav' &&
          <>
            <CustomButton 
              extraStyle={{ 
                backgroundColor: "#fff",
                color: "#000",
                opacity: "0.8",
                fontWeight: "bold",
                "&:hover": {
                    backgroundColor: "#fff",
              }}} 
              name={!isFavourites(data) ? `Add To Fav` : `In Fav`} 
              func={() => !isFavourites(data) ? dispatch(setFavourites(data)) : navigate('/favourites')}
            />
            <CardContent >
              <Typography gutterBottom component="div" className='text-white' >
                {data?.title}
              </Typography>
              <Typography component="div" style={{color:"grey"}}>
                {data.subtitle}
              </Typography>
            </CardContent>
          </>
        }
      </Card>
    )))}
  </div>
  );
}
