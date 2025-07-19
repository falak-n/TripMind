// import { useState,useEffect, React } from 'react';
// //import GlobalAPI from '@/service/GlobalAPI';
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import { Link } from 'react-router';

// function UserTripCard({ trip }) {
//     //const [photoUrl, setPhotoUrl] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // const handlePhotoFetched = (url) => {
//     //     setPhotoUrl(url);
//     //     setLoading(false);
//     // };

//     const [photoUrl, setPhotoUrl] = useState();
    
//       useEffect(() => {
//         trip && GetPlacePhoto();
//       }, [trip])
    
//       const GetPlacePhoto = async () => {
//         const data = {
//           textQuery: trip?.userSelection?.location?.label
//         }
//         const result = await GetPlaceDetails(data).then(resp => {
//           // console.log(resp.data.places[0].photos[3].name)
//           const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//           setPhotoUrl(PhotoUrl)
//         })
//       }
//     return (
//         <Link to={`/view-trip/${trip?.id}`}>
//         <div className='hover:scale-105 transition-all hover:shadow-md'>

//             {/* <GlobalAPI
//                 name={trip.tripData.destination}
//                 address={trip.tripData.destination}
//                 onPhotoFetched={handlePhotoFetched}
//             /> */}

//             <div className="relative">
//                 {!loading && photoUrl && (
//                     <img src={photoUrl} alt={trip.tripData.destination} className="rounded-xl w-full h-[200px] object-cover" />
//                 )}
//             </div>

//             <div>
//                 <h2 className='font-bold text-lg text-black'>{trip?.tripData.destination}</h2>
//                 <h2 className='text-sm text-gray-500'>{trip?.userSelection.days} day {trip?.userSelection.budget} budget trip with {trip?.userSelection.companions}</h2>
//             </div>
//         </div>
//         </Link>
//     )
// }

// export default UserTripCard



import { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom'; // use 'react-router-dom', not 'react-router'

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
      <div className="hover:scale-105 transition-all hover:shadow-md">
        <div className="relative">
          {!loading && photoUrl && (
            <img
              src={photoUrl}
              alt={trip?.tripData?.destination || 'Trip Image'}
              className="rounded-xl w-full h-[200px] object-cover"
            />
          )}
        </div>

        <div>
          <h2 className="font-bold text-lg text-black">
            {trip?.tripData?.destination || 'Unknown Destination'}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.days} day {trip?.userSelection?.budget} budget trip with{' '}
            {trip?.userSelection?.companions}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
