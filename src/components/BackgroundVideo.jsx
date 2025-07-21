import React from 'react'

function BackgroundVideo() {
        return (
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="bg_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      };
      
     

export default BackgroundVideo;