// import React, { useEffect, useState } from 'react';

// import axios from "axios"

// function GlobalAPI({ name, address, onPhotoFetched }) {
//   const [loading, setLoading] = useState(true); // Start with loading true

//   useEffect(() => {
//     const fetchPhoto = async () => {
//       if (!name || !address) {
//         onPhotoFetched('/placeholder.jpg');
//         setLoading(false); // Stop loading if no name or address
//         return;
//       }

//       try {
//         const searchQuery = name;
//         const findPlaceUrl = `https://maps.gomaps.pro/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(searchQuery)}&inputtype=textquery&locationbias=ipbias&language=en&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;

//         const findPlaceResponse = await fetch(findPlaceUrl);
//         const findPlaceData = await findPlaceResponse.json();

//         if (findPlaceData.status === 'OK' && findPlaceData.candidates?.[0]?.place_id) {
//           const placeId = findPlaceData.candidates[0].place_id;
//           const placeDetailsUrl = `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&language=en&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;

//           const placeDetailsResponse = await fetch(placeDetailsUrl);
//           const placeDetailsData = await placeDetailsResponse.json();

//           if (placeDetailsData.status === 'OK' && placeDetailsData.result?.photos?.[0]?.photo_reference) {
//             const photoReference = placeDetailsData.result.photos[0].photo_reference;
//             const photoUrl = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&maxHeight=3000&maxwidth=3000&key=${import.meta.env.VITE_GOMAPS_API_KEY}`;

//             onPhotoFetched(photoUrl);
//           } else {
//             onPhotoFetched('/placeholder.jpg');
//           }
//         } else {
//           onPhotoFetched('/placeholder.jpg');
//         }
//       } catch (error) {
//         onPhotoFetched('/placeholder.jpg');
//       } finally {
//         setLoading(false); // Stop loading when fetch is done
//       }
//     };

//     fetchPhoto();
//   }, [name, address, onPhotoFetched]);

//   return loading ? (
//     <div className="w-full h-48 flex justify-center items-center bg-gray-100 rounded-lg">
//       {/* Elegant Loading Animation */}
//       <div className="animate-pulse flex space-x-4">
//         <div className="rounded-full bg-gray-300 h-12 w-12"></div>
//       </div>
//     </div>
//   ) : null;
// }

// export default GlobalAPI;



// const BASE_URL='https://places.googleapis.com/v1/places:searchText'
// const config={
//   headers:{
//     'Content-Type':'application/json',
//     'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
//     'X-Goog-FieldMask':[
//       'places.photos',
//       'places.displayName',
//       'places.id'
//     ]
//   }
// }

// export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)
//  export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


// import { useEffect, useState } from "react";

// function GlobalAPI({ name, address, onPhotoFetched }) {
//   const [loading, setLoading] = useState(true);
//   const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

//  useEffect(() => {
//   const fetchPhoto = async () => {
//     if (!name || !address) {
//       onPhotoFetched('/placeholder.jpg');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Step 1: Find place from text
//       const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(name)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
//       const findPlaceResponse = await fetch(findPlaceUrl);
//       const findPlaceData = await findPlaceResponse.json();

//       console.log('FindPlace result:', findPlaceData);

//       if (findPlaceData.status === "OK" && findPlaceData.candidates?.length > 0) {
//         const placeId = findPlaceData.candidates[0].place_id;

//         // Step 2: Get place details with photos
//         const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
//         const detailsResponse = await fetch(detailsUrl);
//         const detailsData = await detailsResponse.json();

//         console.log('Details result:', detailsData);

//         const photoRef = detailsData?.result?.photos?.[0]?.photo_reference;

//         if (photoRef) {
//           const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${photoRef}&key=${apiKey}`;
//           onPhotoFetched(photoUrl);
//         } else {
//           onPhotoFetched('/placeholder.jpg');
//         }
//       } else {
//         onPhotoFetched('/placeholder.jpg');
//       }
//     } catch (err) {
//       console.error("Error fetching photo:", err);
//       onPhotoFetched('/placeholder.jpg');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchPhoto();
// }, [name, address, onPhotoFetched]);


//   return loading ? (
//     <div className="w-full h-48 flex justify-center items-center bg-gray-100 rounded-lg">
//       <div className="animate-pulse flex space-x-4">
//         <div className="rounded-full bg-gray-300 h-12 w-12"></div>
//       </div>
//     </div>
//   ) : null;
// }

// export default GlobalAPI;

import axios from "axios"
const BASE_URL='https://places.googleapis.com/v1/places:searchText'
const config={
  headers:{
    'Content-Type':'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask':[
      'places.photos',
      'places.displayName',
      'places.id'
    ]
  }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)
 export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
