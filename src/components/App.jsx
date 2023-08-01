// App.jsx
import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [filter, setFilter] = useState('');

  const handleSubmit = (searchQuery) => {
    setFilter(searchQuery);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery searchQuery={filter} />
    </div>
  );
};

export default App;
