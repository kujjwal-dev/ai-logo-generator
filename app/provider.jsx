"use client"
import React, { useEffect } from 'react'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import axios from 'axios';

function Provider({children}) {


const {user} = useUser();


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
}


  return (
    <div>
        <Header/>
        <div className='px-10 lg:px-32 xl:px-46 2xl:px-56 p-4' >
           {children}
        </div>
        
    </div>
  )
}

export default Provider 