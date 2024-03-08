import React from 'react';
import { ErrorOutline } from '@mui/icons-material';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ErrorOutline className="text-red-500 h-20 w-20 mb-4 text-white" />
      <h1 className="text-xl font-bold text-white">404 - Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
