import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { setFavourites } from '../../store/actions/homeAction';

export default function CustomCard(props) {
  const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []
  const favourites = useSelector(state => state?.home?.movieList?.favourites) ?? []


  const isSearchDetails = props?.data?.selectedResults ?? movieList
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("movieList", movieList)
  const handleClick = (playerData) => {
    navigate("/player", {state: {playerData}})
  }

  const isFavourites = (data) => {
    console.log("chekcing::", data)
    return favourites.some(item => (item.title === data?.title))
  }
  React.useEffect(() => {
  },[props])

  
  return (
    <div className='flex flex-row overflow-x-auto gap-2 cursor-pointer'>
    {(isSearchDetails?.map((data,i) => (
      <Card sx={{ maxWidth: 225, height: (props?.type === 'fav') ? 150 : 320, flexShrink: 0, display: 'flex', flexDirection: 'column', '&:hover': {
        border: '1px solid #3256a8'
      }, border: '1px solid white'  }} key={i} >
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ width: 361, height: 'fit-content' }}
          image={`https://storage.googleapis.com/gtv-videos-bucket/sample/${data?.thumb}`}
          onClick={() => handleClick(data)}
        />
        {props?.type !== 'fav' &&
        <>

          <Button 
              onClick={() => dispatch(setFavourites(data))}
              sx={{
                  backgroundColor: "#222",
                  width: "fit-content",
                  marginTop: "10px",
                  marginLeft: "14px",
                  color: "white",
                  opacity: "0.8",
                  fontWeight: "bold",
                  "&:hover": {
                      backgroundColor: "#222", // Override hover background color to match default color
                  }
              }}
          >
              {!isFavourites(data) ? `Add To Fav` : `Check in Fav`}
          </Button>

         <CardContent >
          <Typography gutterBottom component="div">
            {data?.title}
          </Typography>
          <Typography color="text.secondary" component="div">
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
