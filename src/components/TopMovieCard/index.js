import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopMovieCard = () => {
  const [images, setImages] = useState([]);

  const notify = () => toast("Subscribe to watch premium shows");

  const handleClick = () => {
    notify()
  }

  const loadImages = () => {
    const imgPromises = Array.from({ length: 7 }, (_, i) => {
      return import(`../../assets/Images/topMovies/topMovie${i + 1}.png`).then(module => module.default);
    });

    Promise.all(imgPromises)
      .then(images => {
        setImages(images);
      })
      .catch(error => {
        console.error('Error loading images:', error);
      });
  };

  useState(() => {
    loadImages();
  }, []);

  return (
    <div className="flex flex-row gap-2 overflow-x-auto cursor-pointer">
      {images.map((image, i) => (
        <div
          key={i}
          className="h-72 w-56 bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${image})` }}
          onClick={handleClick}
        />
      ))}
      <ToastContainer />
    </div>
  );
};

export default TopMovieCard;
