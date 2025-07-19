import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'




function InfoSection({ tripInfo }) {
  const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        tripInfo && GetPlacePhoto();
    }, [tripInfo])

    const GetPlacePhoto = async () => {
        // const data = {
        //     textQuery:tripInfo?.userSelection?.location?.label
        // }

                const data = {
          textQuery: tripInfo?.tripData?.destination
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl)
        })
    }
 
  return (
    <div>
      {/* <GlobalAPI
        name={tripInfo?.tripData?.destination + ', best tourist spots hd photos'}
        address={tripInfo?.tripData?.destination}
        onPhotoFetched={handlePhotoFetched}
      /> */}
      <img src={photoUrl} alt="Destination" className='h-[340px] w-full object-cover rounded' />
      <div className='flex justify-between items-baseline'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-3xl mt-2'>
            {(JSON.parse(localStorage.getItem('user'))?.name?.split?.(' ')[0] || 'User')}'s Trip :
         </h2>

          <h2 className='font-semibold text-xl'>Starting from : {tripInfo?.tripData?.source}</h2>
          <h2 className='font-semibold text-xl'>Travelling to : {tripInfo?.tripData?.destination}</h2>
          <div className='flex gap-5'>
            <h2 className=' mt-1 p-1 px-3 bg-gray-200 rounded-full text-gray-700 sm:text-xs md:text-sm justify-between'>📅 For {tripInfo?.userSelection?.days} {tripInfo?.userSelection?.days > 1 ? "days" : "day"}</h2>
            <h2 className=' mt-1 p-1 px-3 bg-gray-200 rounded-full text-gray-700 sm:text-xs md:text-sm justify-between'>🥂 With {tripInfo?.userSelection?.companions}</h2>
            <h2 className=' mt-1 p-1 px-3 bg-gray-200 rounded-full text-gray-700 sm:text-xs md:text-sm justify-between'>💵 {tripInfo?.userSelection?.budget} budget</h2>
          </div>
        </div>
        <Button>
          <IoIosSend className='justify-end' />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;