import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Recents() {
  const playerData = useSelector(state => state?.home?.movieList?.recentViewed?.[0]) ?? [];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/player', {state: {playerData, from: 'recents'}})
  }
  return (
    <div className='flex flex-row gap-2 overflow-x-auto'>
      <div style={{ width: 400, flexShrink: 0 }}>
        <Card sx={{ display: 'flex', flexDirection: 'row', border: '1px solid white' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div">
                {playerData.title}
              </Typography>
              <Typography color="text.secondary" component="div">
                {playerData.subtitle}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              
              <IconButton aria-label="play/pause" onClick={handleClick}>
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
            </Box>
            <LinearProgress variant="determinate" value={playerData.progress} />

          </Box>
          <CardMedia
            component="img"
            sx={{ width: 261, height: 200 }}
            image={`https://storage.googleapis.com/gtv-videos-bucket/sample/${playerData?.thumb}`}
            alt="Live from space album cover"
          />
        </Card>
      </div>
  </div>
    
  );
}
