

import React, { useEffect, useState } from 'react';
import Autocomplete from '@/components/autocomplete';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelList, systemprompt } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { chatSession } from "@/service/AIMODAL";

import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseconfig';
import { useNavigate, useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateTrip() {
  const [formData, setFormData] = useState({
    startingPoint: '',
    destination: '',
    days: '',
    budget: '',
    companions: '',
  });

   const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  // const router=useNavigation();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('formData updated:', formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (resp) => {
      getUserProfile(resp);
    },
    onError: (error) => console.log(error)
  });

  const onGenerateTrip = async () => {
            console.log("DEBUG: formData contents", formData);
      console.log("typeof startingPoint:", typeof formData.startingPoint, "Value:", formData.startingPoint);
      console.log("typeof destination:", typeof formData.destination, "Value:", formData.destination);
      console.log("typeof days:", typeof formData.days, "Value:", formData.days);
      console.log("typeof budget:", typeof formData.budget, "Value:", formData.budget);
      console.log("typeof companions:", typeof formData.companions, "Value:", formData.companions);

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.startingPoint || !formData.destination || !formData.days || !formData.budget || !formData.companions) {
      toast("Please fill all the details before generating trip!", {
        className: 'sonner-toast-nudge',
        style: {
          fontFamily: 'Inter, sans-serif',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fca5a5',
        },
      });
    } else {
      setLoading(true);

      toast.info('Getting trip details...', {
        duration: 5000,
        style: {
          fontFamily: 'Inter, sans-serif',
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          border: '1px solid #93c5fd',
        },
      });
  

      setTimeout(() => {
        toast.info('Getting hotel recommendations...', {
          duration: 5000,
          style: {
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            border: '1px solid #93c5fd',
          },
        });
      }, 5000);

      setTimeout(() => {
        toast.info('Creating trip plan...', {
          duration: 5000,
          style: {
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            border: '1px solid #93c5fd',
          },
        });
      }, 10000);

      setTimeout(() => {
        toast.info('Generating trip details...', {
          duration: 5000,
          style: {
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            border: '1px solid #93c5fd',
          },
        });
      }, 15000);

      const final_prompt = systemprompt
        .replace('{startingPoint}', formData?.startingPoint)
        .replace('{destination}', formData?.destination)
        .replace('{days}', formData?.days)
        .replace('{budget}', formData?.budget)
        .replace('{companions}', formData?.companions);

      const result = await chatSession.sendMessage(final_prompt);
      setLoading(false);
      SaveTrip(result?.response?.text());
    }
  };

  const SaveTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("User from localStorage:", user); // Debug log

    const docId = Date.now().toString();

    await setDoc(doc(db, "Trips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email ?? "unknown@example.com",
      userName: user?.given_name ?? user?.name ?? "Anonymous",
      id: docId
    });

    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  
  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }
    )
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className='max-w-4xl mx-auto px-5 mt-10'>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fca5a5',
          },
        }}
      />
      <h2 className='font-bold text-3xl text-center'>Tell us your travel preferences 🏕️🌴🌊</h2>
      <p className='mt-3 text-gray-500 text-xl text-center'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      {/* STARTING POINT */}
      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Where are you starting at? 🏡</h2>
                 <GooglePlacesAutocomplete
                      apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                      selectProps={{
                        value: formData.startingPoint ? { label: formData.startingPoint, value: formData.startingPoint } : null,
                        onChange: (value) => {
                          console.log("Selected Starting Point:", value);
                          handleInputChange('startingPoint', value?.label || '');
                        },
                        placeholder: "Enter your starting location",
                      }}
                    />

           

        </div>
      </div>

      {/* DESTINATION */}
      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice? 📍</h2>
            <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  value: formData.destination ? { label: formData.destination, value: formData.destination } : null,
                  onChange: (value) => {
                    console.log("Selected Destination:", value);
                    handleInputChange('destination', value?.label || '');
                  },
                  placeholder: "Enter your destination",
                }}
              />


             

        </div>
      </div>

      {/* DAYS */}
      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning to stay?</h2>
        <Input
          placeholder={'Ex. 3 days'}
          type="number"
          value={formData.days}
          onChange={(e) => handleInputChange('days', e.target.value)}
        />
      </div>

      {/* BUDGET */}
      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg transition-all
                ${formData.budget === item.title
                ? 'border-pink-300 shadow-lg shadow-pink-200/50 bg-pink-50'
                : 'border-gray-200'
                }
              `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* COMPANIONS */}
      <div className='mt-20'>
        <h2 className='text-xl my-3 font-medium'>Who are you planning to go with on your next trip?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('companions', item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg transition-all
                ${formData.companions === item.title
                ? 'border-pink-300 shadow-lg shadow-pink-200/50 bg-pink-50'
                : 'border-gray-200'
                }
              `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              <h2 className='flex flex-col text-sm text-gray-500 mt-1'>{item.people}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* GENERATE BUTTON */}
      <div className='mt-20 flex justify-end'>
        <Button className='w-full md:w-auto' onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </Button>
      </div>

      {/* GOOGLE LOGIN DIALOG */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
              <p className='mt-1'>Securely sign in with Google account</p>
              <Button
                onClick={login} className='w-full mt-5 flex gap-4 items-center'>
                <FcGoogle className='h-7 w-7 flex' />Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import _ from "lodash";
// import { Input } from "@/components/ui/input";
// import {
//   AI_PROMPT,
//   SelectBudgetOptions,
//   SelectTravelList,
// } from "@/constants/options";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { chatSession } from "@/service/AIMODAL";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useGoogleLogin } from "@react-oauth/google";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "@/service/firebaseConfig";
// import { useNavigate } from "react-router-dom";

// const CreateTrip = () => {
//   const [place, setPlace] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState([]);
//   const navigate = useNavigate();

//   const handleInputChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
//     onError: (error) => console.log(error),
//   });

//   const handleSelect = _.debounce((value) => {
//     setPlace(value);
//     handleInputChange("location", value);
//   }, 1000);

//   const onGenerateTrip = async () => {
//     const user = localStorage.getItem("user");

//     if (!user) {
//       setOpenDialog(true);
//       return;
//     }

//     if (formData?.noOfDays > 7) {
//       toast("Please enter no. of days less than 8");
//       return;
//     }
//     if (
//       !formData?.noOfDays ||
//       !formData?.location ||
//       !formData?.budget ||
//       !formData?.noOfPeople
//     ) {
//       toast("Please enter all the details");
//       return;
//     }
//     setLoading(true);
//     const FINAL_PROMPT = AI_PROMPT.replace(
//       "{location}",
//       formData?.location?.label
//     )
//       .replace("{totalDays}", formData?.noOfDays)
//       .replace("{traveler}", formData?.noOfPeople)
//       .replace("{budget}", formData?.budget)
//       .replace("{totalDays}", formData?.noOfDays);

//     const result = await chatSession.sendMessage(FINAL_PROMPT);
//     console.log("--", result?.response?.text());
//     setLoading(false);
//     SaveAiTrip(result?.response?.text());
//   };

//   const GetUserProfile = (tokenInfo) => {
//     axios
//       .get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo.access_token}`,
//             Accept: "application/json",
//           },
//         }
//       )
//       .then((resp) => {
//         console.log(resp.data);
//         localStorage.setItem("user", JSON.stringify(resp.data));
//         setOpenDialog(false);
//         onGenerateTrip();
//       })
//       .catch((error) => {
//         console.error("Error fetching user profile:", error);
//       });
//   };

//   const SaveAiTrip = async (TripData) => {
//     setLoading(true);
//     const user = JSON.parse(localStorage.getItem("user"));
//     const docId = Date.now().toString();
//     await setDoc(doc(db, "AITrips", docId), {
//       userChoice: formData,
//       tripData: JSON.parse(TripData),
//       userEmail: user?.email,
//       id: docId,
//     });
//     navigate("/view-trip/" + docId);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-gray-100 min-h-screen py-8 px-4">
//       {/* Heading */}
//       <div className="mt-8 text-center w-full max-w-2xl">
//         <h1 className="font-bold text-blue-900 text-4xl mb-4">
//           Travel Preferences 🚢✈️⛱️
//         </h1>
//         <p className="text-gray-700 text-lg mb-8">
//           Help us understand your travel plans by providing some details below.
//           This information will help us tailor recommendations and make your
//           travel experience as enjoyable as possible.
//         </p>
//       </div>

//       {/* Destination Choice */}
//       <div className="flex flex-col w-full max-w-2xl mb-8">
//         <label className="text-black text-2xl font-semibold mb-2">
//           What is your Destination?
//         </label>
//         <GooglePlacesAutocomplete
//           apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//           selectProps={{
//             placeholder: "Search for places...",
//             onChange: handleSelect,
//           }}
//         />
//       </div>

//       {/* Number of Days */}
//       <div className="flex flex-col w-full max-w-2xl mb-8">
//         <label className="text-black text-2xl font-semibold mb-2">
//           For how many days are you planning?
//         </label>
//         <Input
//           placeholder="e.g., 6"
//           type="number"
//           onChange={(e) => handleInputChange("noOfDays", e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {/* Budget */}
//       <div className="flex flex-col w-full max-w-2xl mb-8">
//         <h2 className="text-black text-2xl font-semibold mb-4">
//           What is your budget?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {SelectBudgetOptions.map((item, index) => (
//             <div
//               key={index}
//               className={`rounded-xl border-2 border-transparent hover:border-blue-500 hover:bg-white transition-all duration-300 p-6 cursor-pointer ${
//                 formData?.budget === item.title
//                   ? "shadow-lg bg-blue-600 text-white"
//                   : "bg-white"
//               }`}
//               onClick={() => handleInputChange("budget", item.title)}
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="text-4xl mb-2">{item.icon}</div>
//                 <h2 className="text-lg font-bold mb-1">{item.title}</h2>
//                 <p className="text-sm">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Number of People */}
//       <div className="flex flex-col w-full max-w-2xl mb-8">
//         <h2 className="text-black text-2xl font-semibold mb-4">
//           Who do you plan on travelling with?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {SelectTravelList.map((item, index) => (
//             <div
//               key={index}
//               className={`rounded-xl border-2 border-transparent hover:border-blue-500 hover:bg-white transition-all duration-300 p-6 cursor-pointer ${
//                 formData?.noOfPeople === item.people
//                   ? "shadow-lg bg-blue-600 text-white"
//                   : "bg-white"
//               }`}
//               onClick={() => handleInputChange("noOfPeople", item.people)}
//             >
//               <div className="flex items-center justify-center">
//                 <div className="text-4xl mr-2">{item.icon}</div>
//                 <h2 className="text-lg font-bold">{item.title}</h2>
//               </div>
//               <p className="text-center mt-2">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Generate Trip Button */}
//       <div className="flex justify-center w-full max-w-2xl">
//         <Button
//           onClick={onGenerateTrip}
//           disabled={loading}
//           className="w-full py-3 text-lg"
//         >
//           {loading ? "Generating Trip..." : "Generate Trip"}
//         </Button>
//       </div>

//       {/* Sign In Dialog */}
//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Sign In</DialogTitle>
//             <DialogDescription>
//               <div className="flex flex-col items-center">
//                 <img src="/logo.png" alt="Logo" className="w-20 mb-4" />
//                 <span>Sign in with Google Authentication securely</span>
//                 <Button onClick={login} className="w-full mt-5">
//                   Sign in with Google
//                 </Button>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CreateTrip;
