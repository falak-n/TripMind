import React from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaMoneyBillWave } from 'react-icons/fa';

function FlightCard({ tripInfo }) {
  return (
    <div className="py-10 px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-8 border-indigo-500 pl-4">
        ✈️ Available Flights
      </h2>

      <div className="flex flex-wrap gap-6 justify-start">
        {tripInfo?.tripData?.travelDetails?.flights?.map((flight, index) => (
          <div
            key={index}
            className="flex flex-row items-center bg-white rounded-2xl shadow-md border border-indigo-200 hover:shadow-lg transition duration-300   w-[31%]"
          >
            {/* Uncomment this if you want image */}
            {/* 
            <img
              src="https://images.unsplash.com/photo-1571920099443-554b6a178f46?auto=format&fit=crop&w=1200&q=80"
              alt="Flight"
              className="w-44 h-36 object-cover rounded-l-2xl"
            /> 
            */}

            <div className="p-4 flex-1 text-gray-800">
              <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
                <FaPlaneDeparture className="text-indigo-500" />
                {flight?.airline} - {flight?.flightNumber}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <FaPlaneDeparture className="text-green-600" /> Departure: {flight?.departureTime}
                </div>
                <div className="flex items-center gap-1">
                  <FaPlaneArrival className="text-red-500" /> Arrival: {flight?.arrivalTime}
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-yellow-500" /> Duration: {flight?.duration}
                </div>
                <div className="flex items-center gap-1">
                  <FaMoneyBillWave className="text-emerald-600" /> ₹{flight?.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightCard;
