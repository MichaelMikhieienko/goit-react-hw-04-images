// App.jsx
import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {searchQuery && <ImageGallery searchQuery={searchQuery} />}
    </div>
  );
};

export default App;
