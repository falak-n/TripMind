import { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const textQuery =
      trip?.tripData?.destination || trip?.userSelection?.location?.label;

    if (!textQuery) {
      console.warn('No location found in trip:', trip);
      setLoading(false);
      return;
    }

    try {
      const response = await GetPlaceDetails({ textQuery });
      const photoArray = response?.data?.places?.[0]?.photos;

      if (photoArray && photoArray.length > 0) {
        const photoName = photoArray[0]?.name;
        const url = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(url);
      } else {
        console.warn('No photos found for:', textQuery);
      }
    } catch (err) {
      console.error('Error fetching place photo:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="relative overflow-hidden border border-white/30 rounded-2xl p-4 backdrop-blur-md shadow-xl transition-transform hover:scale-[1.03] w-full h-[53vh] bg-white/10">
        {/* Image Section */}
        <div className="relative h-[200px] overflow-hidden rounded-xl">
          {!loading && photoUrl ? (
            <img
              src={photoUrl}
              alt={trip?.tripData?.destination || 'Trip Image'}
              className="w-full h-full object-cover rounded-xl border border-white/20"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-xl animate-pulse" />
          )}
        </div>

        {/* Trip Details */}
        <div className="mt-4 text-center text-black">
          <h2 className="text-xl font-semibold mb-2 drop-shadow">
            {trip?.tripData?.destination || 'Unknown Destination'}
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            {trip?.userSelection?.days} day <br />
            {trip?.userSelection?.budget} budget trip <br />
            with {trip?.userSelection?.companions}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
