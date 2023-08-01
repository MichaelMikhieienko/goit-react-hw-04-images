// ImageGalleryItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <li className="ImageGalleryItem" onClick={() => openModal(image.largeImageURL)}>
      <img src={image.webformatURL} alt={image.tags} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

