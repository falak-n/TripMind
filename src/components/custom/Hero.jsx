import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import BackgroundVideo from '../BackgroundVideo';
import Header from './Header';

const Hero = () => {
  return (
    <div className="relative h-screen w-screen  overflow-hidden">
      {/* 🔽 Background video behind */}
      <BackgroundVideo />

      {/* 🔼 Foreground content on top */}
      <div className="relative z-10 h-full  flex flex-col items-center mx-56 gap-9 text-white">
        <Header />
        <h1 className="font-extrabold text-[60px] text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Explore the destination with AI
        </h1>
        <p className='headline font-extralight opacity-[70%]'>"AI Trip Planner intelligently curates personalized travel itineraries based on your preferences, budget, and travel style."</p>

<div className="typewriter opacity-[70%] font-thin text-white text-xl text-center mt-4">
  <p>Tourism opens the door to discovery, connecting people, cultures, and unforgettable experiences.</p>
</div>
        <Link to="/create-trip">
          <Button className='bg-yellow-500 text-black'>Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;