import React from 'react';
import ScrollArrow from '../components/ScrollArrow';

const HomeHeroTop = () => {
  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source 
            src="https://res.cloudinary.com/dnddesigncenter/video/upload/fkox3toh7a1iser92fqm.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      {/* Reusable Scroll Arrow - Scrolls to the section with id "HomeProjectsCards" */}
      <ScrollArrow targetId="HomeProjectsCards" />
    </div>
  );
};

export default HomeHeroTop;
