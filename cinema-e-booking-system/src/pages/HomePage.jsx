import React from 'react';
import Navbar from '../components/Navbar';  
import MovieList from '../components/MovieList';

const HomePage = () => {

  return (
    <div className='bg-gray-200'>
      <Navbar/> 
      <MovieList title="Currently Running Movies" />
      <MovieList title="Coming Soon!" allowToBook={false}/>
    </div>
  );
};

export default HomePage;
