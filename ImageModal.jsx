import React, { useState } from 'react';
import './ImageModal.css';

const ImageModal = ({ isOpen, onClose, image, title, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!isOpen) return null;

  // Support both single image (string) and multiple images (array)
  const images = Array.isArray(image) ? image : [image];
  const showCarousel = images.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-image-container">
          {showCarousel && (
            <button className="modal-carousel-arrow modal-carousel-left" onClick={goToPrevious}>
              ‹
            </button>
          )}
          <img src={images[currentIndex]} alt={title} className="modal-image" />
          {showCarousel && (
            <button className="modal-carousel-arrow modal-carousel-right" onClick={goToNext}>
              ›
            </button>
          )}
        </div>
        {showCarousel && (
          <div className="modal-carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`modal-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
        <div className="modal-details">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
