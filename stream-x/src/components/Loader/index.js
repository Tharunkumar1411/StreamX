import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux"
import { fetchMovieDetails } from "../../store/actions/homeAction";

const Loader = (props) => {
  const isLoading = useSelector(state => state?.home?.movieList?.videos)
  const dispatch = useDispatch();

  // if initial api failes then polling that root api for movie details.
  useEffect(() => {
    let isMounted = true; 

    function executeWhileLoop() {
        if (!isMounted) return; 
    
        if (props?.from === 'categories' && (!isLoading || !isLoading.length)) {
            dispatch(fetchMovieDetails());
        } else {
            isMounted = false; 
            return;
        }
    
        setTimeout(executeWhileLoop, 5000);
    }
    
    executeWhileLoop();
      
      return () => {
          isMounted = false;
      };
   
}, [props, isLoading, dispatch]);


  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black z-50">
      <CircularProgress className="bg-primary" style={{ color: '#FF0000' }} />
    </div>
  );
};

export default Loader;
