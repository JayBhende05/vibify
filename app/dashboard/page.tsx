import Header from '@/components/dashboard/Header'
import Hero from '@/components/dashboard/Hero'
import Playbar from '@/components/dashboard/PlayBar'
import QueueSection from '@/components/dashboard/QueueSection'
import Sidebar from '@/components/dashboard/Sidebar'
import SocialHub from '@/components/dashboard/SocialHub'
import SongList from '@/components/dashboard/SongList'

import React from 'react'

function page() {
  return (
    <>
    <div className="flex h-screen bg-background text-white selection:bg-brand/30 overflow-hidden font-sans">
      <Sidebar  />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <Header />

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
          <Hero  />
          {/* <SongList  /> */}
          <QueueSection />
          <SocialHub />
          </div>
        </div>
      </main>

      <Playbar />
    </div>
    {/* <div className="flex h-screen">
      <Sidebar {...props} />

      <main className="flex-1 flex flex-col">
        <Header {...props} />

        <div className="flex-1 p-8 grid grid-cols-12 gap-8">
          <Hero {...props} />
          <SongList {...props} />
          <SocialHub />
        </div>
      </main>

      <Playbar {...props} />
    </div> */}

    
      
    </>
  )
}

export default page
