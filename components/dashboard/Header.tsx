"use client"
import { main } from 'framer-motion/client';
import { Search } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react';
import React from 'react'

function Header() {
  // const session = await getServerSession();
  const { data: session, status} = useSession()

  function handleLogin (){
    signIn("google", { callbackUrl : "/"})
  }
  return (
 <>
    <main >
     <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-background/80 backdrop-blur-md z-10">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-brand-light transition-colors" />
            <input 
              type="text" 
              placeholder="Search for songs, vibes, or users..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/40 transition-all font-medium"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
             {session?.user ? (
               <div className="flex items-center gap-4">
                 <div className="text-right hidden sm:block">
                   <p className="text-sm font-medium tracking-tight">{session.user?.name}</p>
                   <p className="text-[10px] text-brand-light font-semibold uppercase tracking-wider">Pro Curator</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 border border-white/20 overflow-hidden shadow-lg">
                   {/* <img src={user.photoURL || ''} alt="Profile" className="w-full h-full object-cover" /> */}
                 </div>
               </div>
             ) : (
               <button onClick={handleLogin} className="text-sm font-semibold text-white/60 hover:text-white transition-colors">
                 Sign In
               </button>
             )}
          </div>
        </header>
        </main>
      
    </>
  )
}

export default Header
