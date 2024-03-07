import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchResult } from "../../store/actions/homeAction";

export default function SearchBar() {
  const movieList = useSelector(state => state?.home?.movieList?.videos) ?? []
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();

  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowResults(value !== '');
    debouncedSearch(value);
  };

  const debouncedSearch = debounce((value) => {
    const results = movieList.filter(item =>
      Object.values(item).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(value.toLowerCase())
      )
    );
    setSearchedResults(results);
  }, 300);

  const handleOptionclick = (data) => {
    setSearchTerm(data?.title);
    setShowResults(false);
    setSelectedResult(data);
  }

  const handleIconClick = () => {
    dispatch(setSearchResult(selectedResult))
    if(location.pathname !== "/searchResults"){
      navigate('/searchResults', {state: {selectedResult}});
    }
    setSearchTerm('')
  }

  return (
    <div style={{ position: 'relative' }}>
      <Paper
        component="form"
        sx={{ display: 'flex', alignItems: 'center', width: 200, padding: 0.8, borderRadius: 20, backgroundColor: "transparent", border: "1px solid #73747E" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: "white" }}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search google maps' }}
          value={searchTerm}
          onChange={handleChange}
        />

        <IconButton size="small" type="button" aria-label="search"
          sx={{
            backgroundColor: "red", '&:hover': {
              backgroundColor: 'red'
            }
          }}
          onClick={handleIconClick}
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Paper>

      {showResults && (
       <div className="absolute top-16 left-0 w-full z-50 cursor-pointer max-h-60 overflow-y-auto rounded-md" style={{backgroundColor:"#222", opacity: 0.6}}>
       {searchedResults.length > 0 ? (
         <div className="w-full p-1.5">
           {searchedResults.map((item, index) => (
             <div className="flex flex-row gap-4 mb-2" key={index} onClick={() => handleOptionclick(item)}>
               <img width={40} height={40} src={`https://storage.googleapis.com/gtv-videos-bucket/sample/${item?.thumb}`} alt="thumb"/>
               <p>{item.title}</p>
             </div>
           ))}
         </div>
       ) : (
         <p style={{ padding: '10px' }}>No results found</p>
       )}
     </div>
     
      )}
    </div>
  );
}