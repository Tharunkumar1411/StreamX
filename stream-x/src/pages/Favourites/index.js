import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '1rem',
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
});

export default function Favorites() {
    const navigate = useNavigate();
    const handleClick = (playerData) => {
        navigate("/player", {state: {playerData}})
    }
    const favourites = useSelector(state => state?.home?.movieList?.favourites) ?? []

    return (
    <>
        {(favourites.length) ? (
            <>

            <h1 className="text-white mt-4 mb-2 ml-4 font-bold">Favourites </h1>
            <CardContainer className="m-4">
            {favourites.map((data, index) => (
                <Card sx={{ maxWidth: 305, border:"1px solid white" }} key={index} onClick={() => handleClick(data)}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {data?.title[0]}
                    </Avatar>
                    }
                    action={ 
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    }
                    title={data?.title}
                    subheader={data?.subtitle}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={`https://storage.googleapis.com/gtv-videos-bucket/sample/${data?.thumb}`}
                    alt="Paella dish"
                />
                </Card>
            ))}
        </CardContainer></>) : 
            <div className="flex justify-center items-center mt-40">
                <div className="text-white" style={{color: "white"}}>
                    No Favourites Found
                </div>
            </div>
        }   
     </>

  );
}
