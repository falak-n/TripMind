import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDollar, AiFillStar } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import GlobalAPI from '@/service/GlobalAPI';

function HotelCard({ hotelInfo }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePhotoFetched = (url) => {
    setPhotoUrl(url);
    setLoading(false);
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotelInfo.name},${hotelInfo.address}`}
      target="_blank"
      className="block"
    >
      <div className="group bg-white/10 backdrop-blur-md border border-white/20 hover:border-indigo-400 rounded-2xl shadow-xl hover:shadow-indigo-400/40 overflow-hidden transition-all duration-300 hover:scale-[1.03] flex flex-col h-full">
        {/* API to get hotel photo */}
        <GlobalAPI
          name={hotelInfo.name}
          address={hotelInfo.address}
          onPhotoFetched={handlePhotoFetched}
        />

        {/* Image Section */}
        <div className="relative h-44 w-full overflow-hidden">
          {!loading && photoUrl && (
            <img
              src={photoUrl}
              alt={hotelInfo.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Card Details */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          {/* Hotel Name + Rating */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-white leading-snug line-clamp-2">
              {hotelInfo.name}
            </h2>
            <div className="flex items-center text-sm text-yellow-400 font-medium">
              <AiFillStar className="mr-1" />
              {hotelInfo?.rating}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center text-xs text-gray-300 mb-3 line-clamp-1">
            <FaMapMarkerAlt className="text-pink-400 mr-1" />
            {hotelInfo.address}
          </div>

          {/* Price Badge */}
          <div className="mt-auto">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-semibold shadow-lg">
              <AiOutlineDollar />
              ₹{hotelInfo.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
