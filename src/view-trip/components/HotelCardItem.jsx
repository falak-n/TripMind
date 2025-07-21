import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillStar, AiOutlineDollar } from 'react-icons/ai';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.name,
    };
    try {
      const resp = await GetPlaceDetails(data);
      const photoRef = resp.data.places?.[0]?.photos?.[3]?.name;
      if (photoRef) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl overflow-hidden group">
        {/* Image */}
        <div className="h-44 w-full overflow-hidden relative">
          <img
            src={photoUrl || '/placeholder.jpg'}
            alt={hotel?.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
        </div>

        {/* Hotel Info */}
        <div className="p-4 text-white flex flex-col gap-2">
          <h2 className="font-semibold text-lg line-clamp-2">{hotel?.name}</h2>

          <div className="text-sm flex items-center gap-2 text-gray-300 line-clamp-1">
            <FaMapMarkerAlt className="text-pink-400" />
            <span>{hotel?.address}</span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="flex items-center gap-1 text-sm text-green-300 font-medium">
              <AiOutlineDollar />
              ₹{hotel?.price}
            </span>

            <span className="flex items-center gap-1 text-sm text-yellow-400">
              <AiFillStar />
              {hotel?.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
