import React from 'react';
import { FaTrain, FaClock, FaMoneyBillWave, FaTicketAlt } from 'react-icons/fa';

function TrainCard({ tripInfo }) {
  const defaultTrainImg =
    'https://images.unsplash.com/photo-1587202372775-989d1c48b7a5?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className=" py-10 px-6  ">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-8 border-indigo-500 pl-4">
        🚆 Available Trains
      </h2>

      <div className="flex flex gap-6">
        {tripInfo?.tripData?.travelDetails?.trains?.map((train, index) => (
          <div
            key={index}
            className="flex flex-row items-center bg-white rounded-2xl shadow-md border border-indigo-200 hover:shadow-lg transition duration-300 w-full max-w-4xl mx-auto overflow-hidden"
          >
            {/* Train Image */}
            {/* <img
              src={defaultTrainImg}
              alt="Train"
              className="w-40 h-36 object-cover rounded-l-2xl"
            /> */}

            {/* Train Details */}
            
            <div className="p-4 flex-1 text-gray-800">
              <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
                <FaTrain className="text-indigo-500" /> {train?.name}
              </h3>
              <div className="flex flex-wrap gap-5 mt-[30%] text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <FaTicketAlt className="text-indigo-400" /> #{train?.number}
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-green-600" /> Departure: {train?.departureTime}
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-red-500" /> Arrival: {train?.arrivalTime}
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-yellow-500" /> Duration: {train?.duration}
                </div>
                <div className="flex items-center gap-1">
                  <FaMoneyBillWave className="text-emerald-600" /> ₹{train?.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainCard;
