"use client"
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import { UserDetailContex } from './_context/UserDetailContext';

function Provider({children}) {


const {user} = useUser();
const [userDetail,setUserDetail] = useState();


useEffect(() => {
user&&CheckUserAuth();
},[user])
//save user data
const CheckUserAuth=async()=>{
  //save user to database
  const result = await axios.post('/api/users',{
    userName: user?.fullName,
    userEmail: user?.primaryEmailAddress?.emailAddress
  });
  console.log(result.data);
  setUserDetail(result.data);
}


  return (
    <div>
      <UserDetailContex.Provider value={{userDetail,setUserDetail}}>
        <Header/>
        <div className='px-10 lg:px-32 xl:px-46 2xl:px-56 p-4' >
           {children}
        </div>
        </UserDetailContex.Provider>
    </div>
  )
}

export default Provider 