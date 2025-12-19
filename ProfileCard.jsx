import React, { useState, useRef } from 'react';

const ProfileCard = ({
  name = "John Doe",
  title = "Software Developer",
  handle = "@johndoe",
  status = "Online",
  contactText = "Contact",
  avatarUrl = "https://via.placeholder.com/150",
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick = () => {}
}) => {
  const [transform, setTransform] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!enableTilt) return;
    
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div 
      ref={cardRef}
      className="profile-card"
      style={{ 
        transform,
        transition: 'transform 0.1s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="profile-card-inner">
        <div className="profile-card-header">
          <div className="profile-avatar">
            <img src={avatarUrl} alt={name} />
            {status && (
              <div className={`status-indicator ${status.toLowerCase()}`}></div>
            )}
          </div>
        </div>
        
        {showUserInfo && (
          <div className="profile-info">
            <h2 className="profile-name">{name}</h2>
            <p className="profile-title">{title}</p>
            <p className="profile-handle">{handle}</p>
          </div>
        )}
        
        <button className="contact-button" onClick={onContactClick}>
          {contactText}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
