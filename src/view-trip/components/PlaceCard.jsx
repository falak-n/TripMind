import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCard({ placeInfo }) {
  // const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  // const handlePhotoFetched = (url) => {
  //   console.log('Setting photo URL:', url);
  //   setPhotoUrl(url);
  // };
    const [photoUrl, setPhotoUrl] = useState();
    
        useEffect(() => {
             placeInfo &&GetPlacePhoto();
        }, [ placeInfo ])
    
        const GetPlacePhoto = async () => {
            const data = {
                textQuery: placeInfo?.name
            }
            const result = await GetPlaceDetails(data).then(resp => {
                console.log(resp.data.places[0].photos[3].name)
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
                setPhotoUrl(PhotoUrl)
            })
        }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + placeInfo?.name} target='_blank' className='no-underline'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        
        {/* <GlobalAPI
          name={placeInfo?.name}
          address={placeInfo?.address}
          onPhotoFetched={handlePhotoFetched}
        /> */}

        <img className='h-[150px] w-[150px] rounded-xl' src={photoUrl} alt={placeInfo?.name} />
        <div>
          <h2 className='font-bold text-lg text-black'>{placeInfo?.name}</h2>
          <p className='text-black'>{placeInfo?.details}</p> 
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;