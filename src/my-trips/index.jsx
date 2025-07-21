import { collection, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router';
import { db } from '@/service/firebaseConfig';
import { getDocs } from 'firebase/firestore';
import UserTripCard from './components/UserTripCard';

function MyTrips() {
    
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);
    useEffect(() => {
        getUserTrips();
    }, [])

    // const getUserTrips = async () => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (!user) {
    //         navigation('/');
    //         return;
    //     }
    //     setUserTrips([]);
    //     const q = query(collection(db, 'Trips'), where('userEmail', '==', user?.email));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, "=>", doc.data());
    //         setUserTrips(prevVal => [...prevVal, doc.data()])
    //     });
    // }
    
        const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }
        setUserTrips([]);
        const q = query(collection(db, 'Trips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        
        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push({ id: doc.id, ...doc.data() }); // 👈 include doc ID
        });
        setUserTrips(trips); // ✅ set once after loop
    };

    return (
        <div className=' sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                {/* {userTrips.map((trip,index)=>(
                    <UserTripCard trip={trip}/>
                ))} */}
                    {userTrips.map((trip, index) => (
                      <UserTripCard key={trip.id || index} trip={trip} />
                    ))}

            </div>
        </div>
    )
}

export default MyTrips