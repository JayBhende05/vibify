"use client"
import { Heart, LogIn, LogOut, Music, Share2, TrendingUp, Users } from 'lucide-react'
import React from 'react'
import NavItem from './NavItem'
import { getServerSession } from 'next-auth'
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
    const {data, status} = useSession();

    const handleLogout = ()=>{
    signOut({ callbackUrl: "/" })
  }

  const handleLogin = () =>{
    signIn("google", { callbackUrl: "/" })
  }
  return (
    <>
     <aside className="w-64 border-r border-white/10 flex flex-col p-6 bg-surface z-20">
        <div className="flex items-center gap-2 mb-12 group cursor-pointer">
          <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Vibify</span>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 px-2">Menu</p>
            <nav className="flex flex-col gap-1">
              <NavItem icon={<TrendingUp className="w-4 h-4" />} label="Discovery" active />
              <NavItem icon={<Users className="w-4 h-4" />} label="Social Rooms" />
              <NavItem icon={<Heart className="w-4 h-4" />} label="Favorites" />
            </nav>
          </div>

          <div>
             <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 px-2">Library</p>
             <nav className="flex flex-col gap-1">
               <NavItem icon={<Music className="w-4 h-4" />} label="My Tracks" />
               <NavItem icon={<Share2 className="w-4 h-4" />} label="Shared With Me" />
             </nav>
          </div>

          {/* {user && songs.length === 0 && (
            <button 
              onClick={seedSongs}
              className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-indigo-400 transition-colors uppercase tracking-widest"
            >
              Seed Demo Tracks
            </button>
          )} */}
        </div>

        <div className="mt-8">
          <div className="p-4 bg-surface-gradient rounded-xl border border-white/10">
            <p className="text-xs font-semibold mb-2">Currently Voting</p>
            <p className="text-[10px] text-white/50 leading-tight mb-3">Vote for the next track in 'Community House' room.</p>
            
            {data?.user ? (
               <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg mb-3">
                 {/* <img src={session.user} alt="User" className="w-8 h-8 rounded-full border border-white/20" /> */}
                 <div className="min-w-0">
                    <p className="text-[10px] font-bold truncate">{data.user?.name}</p>
                    <button onClick={handleLogout} className="text-[9px] text-white/40 hover:text-white flex items-center gap-1 transition-colors">
                      <LogOut className="w-3 h-3" /> Sign Out
                    </button>
                 </div>
               </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="w-full bg-white text-black py-2 rounded-lg text-xs font-bold hover:bg-white/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <LogIn className="w-3 h-3" /> Join to Vote
              </button>
            )}
          </div>
        </div>
      </aside>
      
    </>
  )
}

export default Sidebar
