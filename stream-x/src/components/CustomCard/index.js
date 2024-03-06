import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useSelector} from "react-redux"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function CustomCard(props) {
  const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []

  const navigate = useNavigate()

  const handleClick = (playerData) => {
    navigate("/player", {state: {playerData}})
  }
  
  return (
    <div className='flex flex-row overflow-x-auto gap-2 cursor-pointer'>
    {(movieList?.map((data,i) => (
      <Card sx={{ maxWidth: 225, height: (props?.type === 'fav') ? 250 : 300, flexShrink: 0, display: 'flex', flexDirection: 'column', '&:hover': {
        border: '1px solid #3256a8'
      }, border: '1px solid white'  }} key={i} onClick={() => handleClick(data)}>
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ width: 361, height: 'fit-content' }}
          image={`https://storage.googleapis.com/gtv-videos-bucket/sample/${data?.thumb}`}
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {data?.title}
          </Typography>
          <Typography color="text.secondary" component="div">
            {data.subtitle}
          </Typography>
        </CardContent>

        {props.type !== 'fav' &&
          <IconButton className='w-fit gap-2 rounded-md p-2'>
          <PlaylistAddIcon className='ml-2'/>
          <Typography>Add to favourites</Typography>
        </IconButton>
        }
      </Card>
    )))}
  </div>
  
  );
}
