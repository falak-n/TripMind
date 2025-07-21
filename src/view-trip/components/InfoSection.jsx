import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ tripInfo }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    tripInfo && GetPlacePhoto();
  }, [tripInfo]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: tripInfo?.tripData?.destination
    };
    try {
      const result = await GetPlaceDetails(data);
      const photoName = result?.data?.places?.[0]?.photos?.[3]?.name;
      if (photoName) {
        const url = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error("Failed to fetch photo:", error);
    }
  };

  const userFirstName = JSON.parse(localStorage.getItem('user'))?.name?.split?.(' ')[0] || 'User';

  return (
    <section className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-md p-6">
      
      {/* Destination Image */}
      <div className="w-full md:w-[45%] rounded-xl overflow-hidden">
        <img
          src={photoUrl || 'https://via.placeholder.com/400x300?text=Destination+Image'}
          alt="Destination"
          className="w-full h-[340px] object-cover rounded-xl shadow"
        />
      </div>

      {/* Trip Info */}
      <div className="flex flex-col justify-between w-full md:w-[55%] gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {userFirstName}'s Trip 🚀
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            <span className="text-gray-800">Starting from:</span> {tripInfo?.tripData?.source}
          </p>
          <p className="text-gray-600 text-lg font-medium">
            <span className="text-gray-800">Travelling to:</span> {tripInfo?.tripData?.destination}
          </p>

          {/* Trip Tags */}
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
              📅 {tripInfo?.userSelection?.days} {tripInfo?.userSelection?.days > 1 ? "days" : "day"}
            </span>
            <span className="bg-pink-100 text-pink-800 px-4 py-1 rounded-full text-sm font-medium">
              🥂 With {tripInfo?.userSelection?.companions}
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
              💵 {tripInfo?.userSelection?.budget} budget
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition">
            Send <IoIosSend className="text-xl" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
