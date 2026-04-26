"use client"
import React from 'react'
import DashboardLayout from './layout'
import { useSession } from 'next-auth/react'

function page() {
  const {data: session} = useSession();
  
  return (
    <>
<div>Home page</div>

      {session?.user.id}
    </>
  )
}

export default page
