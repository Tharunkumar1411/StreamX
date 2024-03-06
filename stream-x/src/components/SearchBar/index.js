import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{ display: 'flex', alignItems: 'center', width: 200, padding: 0.8 , borderRadius:20, backgroundColor:"transparent", border:"1px solid #73747E" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color:"white"}}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search google maps' }}
      />

      <IconButton size="small" type="button" aria-label="search" 
        sx={{backgroundColor:"red", '&:hover': {
          backgroundColor: 'red'
        }}}>
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Paper>
  );
}
