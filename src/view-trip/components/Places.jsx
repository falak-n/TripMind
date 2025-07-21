import React from 'react';
import PlaceCard from './PlaceCard';
import { LuAlarmClockCheck } from "react-icons/lu";

function Places({ tripInfo }) {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-8 border-b pb-2 border-gray-300">
        🗺️ Places to Visit & Plan
      </h2>

      {tripInfo.tripData?.itinerary.map((item, index) => (
        <div key={index} className="mb-10">
          {/* Day Heading */}
          <div className="bg-gradient-to-r from-indigo-100 to-white border-l-4 border-indigo-500 px-4 py-2 rounded-md shadow-sm mb-4">
            <h3 className="text-xl font-semibold text-indigo-700">Day {item.day}</h3>
          </div>

          {/* Places */}
          <div className="grid md:grid-cols-2 gap-6">
            {item.places.map((place, index) => (
              <div key={index} className="relative">
                <PlaceCard placeInfo={place} />
                <div className="flex items-center mt-2 ml-1 text-sm text-orange-700">
                  <LuAlarmClockCheck className="mr-2 text-base" />
                  <span className="font-medium">{place.bestTimeToVisit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Places;
