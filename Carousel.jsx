import React, { useState, useRef, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ children, itemsPerView = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView);
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1200) {
        setItemsToShow(2);
      } else {
        setItemsToShow(itemsPerView);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [itemsPerView]);

  const items = React.Children.toArray(children);
  const maxIndex = Math.max(0, items.length - itemsToShow);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <div className="carousel-container">
      {maxIndex > 0 && (
        <>
          <button className="carousel-arrow carousel-arrow-left" onClick={goToPrev} aria-label="Previous">
            ‹
          </button>
          <button className="carousel-arrow carousel-arrow-right" onClick={goToNext} aria-label="Next">
            ›
          </button>
        </>
      )}
      
      <div className="carousel-viewport" ref={carouselRef}>
        <div 
          className="carousel-track"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className="carousel-item"
              style={{ 
                flex: `0 0 ${100 / itemsToShow}%`,
                maxWidth: `${100 / itemsToShow}%`
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
