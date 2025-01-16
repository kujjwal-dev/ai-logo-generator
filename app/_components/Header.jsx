"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  const {user} = useUser();
  return (
    <div className='px-10 lg:px-32 xl:px-46 2xl:px-56 p-4 flex justify-between items-center shadow-sm'>
        <Image src={'logo.svg'} alt='logo' width={100} height={100} />
        <div className='flex gap-3 items-center'> 
          {user ? <Button variant='outline' >Dashboard</Button> : <Button>Get Started</Button>  } 
          <UserButton/>
        </div>
    </div>
  )
}

export default Header