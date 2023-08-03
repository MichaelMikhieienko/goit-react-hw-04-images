// ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '35106771-5ec042213d922cbd410dda217';
const perPage = 12;

const getImage = async params => {
  const url = new URL(baseUrl);

  url.searchParams.append('key', apiKey);

  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  return response.json();
};

const ImageGallery = ({ searchQuery }) => {
  const memoSearchQuery = React.useMemo(() => searchQuery, [searchQuery]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [page, setPage] = useState(1);

  const fetchImages = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getImage({ q: memoSearchQuery, page, per_page: perPage });
      setImages(prevImages => [...prevImages, ...data.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, memoSearchQuery]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, memoSearchQuery, page]);

  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [memoSearchQuery]);

  const loadMoreHandleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageUrl => {
    setShowModal(true);
    setLargeImageUrl(largeImageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageUrl('');
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <ul className="ImageGallery">
        {images.map((image, index) => (
          <React.Fragment key={`${image.id}-${index}`}>
            <ImageGalleryItem image={image} openModal={openModal} />
          </React.Fragment>
        ))}
      </ul>
      {isLoading && <Loader />}
      {images.length > 0 && <Button onClick={loadMoreHandleClick} />}
      {showModal && (
        <Modal largeImageURL={largeImageUrl} onClose={closeModal} />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
