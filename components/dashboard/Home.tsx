"use client"
import React from 'react'
import DashboardLayout from './layout'
import { useSession } from 'next-auth/react'

import { Plus, Users, History, TrendingUp, Sparkles } from 'lucide-react';
import RoomCard from '@/components/dashboard/RoomCard';
import UploadedLink from '@/components/dashboard/UploadedLink';
// import { Room, Song, User } from '../types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// interface HomeProps {
//   user: User;
//   createdRooms: Room[];
//   joinedRooms: Room[];
//   uploadedSongs: Song[];
//   onEnterRoom: (roomId: string) => void;
//   onCreateRoom: () => void;
// }

export default function Home({ createdRooms, joinedRooms, uploadedSongs}) {

  const {data: session , status} = useSession();
  const router = useRouter();
  if(!session?.user && status == "authenticated"){
    return (
      <>
      <div>Loading</div>
      </>
    )
  }

  function onEnterRoom(roomId){
      router.push(`/dashboard/room/${roomId}`)
  }

  function onCreateRoom(){
    router.push('/dashboard/room/create');
  }
  
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Welcome Hero */}
      <section className="mb-16 relative p-12 rounded-[3rem] overflow-hidden border border-white/5 bg-gradient-to-br from-brand/20 via-surface to-surface">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-brand/20 text-brand-light text-[10px] font-black uppercase px-3 py-1 rounded-full border border-brand/20 flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Welcome Back, {session?.user.name}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1]">
              The pulse of the <span className="text-brand-light">vibe</span> is in your hands.
            </h1>
            <p className="text-lg text-white/50 font-medium mb-10 leading-relaxed">
              Create a room, invite your friends, and curate the perfect audiovisual experience together with real-time voting.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={onCreateRoom}
                className="px-10 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Launch New Room
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                Explore Rooms
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-12">
        {/* Left Side: Rooms */}
        <div className="col-span-12 lg:col-span-8 space-y-16">
          {/* Created Rooms */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand-light">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight mb-0.5">My Domains</h2>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Rooms you manage</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {createdRooms.map(room => (
                <RoomCard 
                  key={room.roomId} 
                  room={room} 
                  role="host" 
                  onClick={() => onEnterRoom(room.roomId)}
                />
              ))}
              <button 
                onClick={onCreateRoom}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 rounded-3xl hover:border-brand/40 hover:bg-brand/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand transition-all">
                  <Plus className="w-6 h-6 text-white/40 group-hover:text-white" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-white/20 group-hover:text-brand-light transition-colors">Start Another Room</p>
              </button>
            </div>
          </section>

          {/* Participated Rooms */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight mb-0.5">Community Beats</h2>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Recently visited</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {joinedRooms.map(room => (
                <RoomCard 
                  key={room.id} 
                  room={room} 
                  role="participant" 
                  onClick={() => onEnterRoom(room.id)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Upload History */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight mb-0.5">Sync History</h2>
                <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Previously shared links</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              {uploadedSongs.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <History className="w-10 h-10 text-white/5 mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest text-white/20 italic">No history yet</p>
                </div>
              ) : (
                uploadedSongs.map(song => (
                  <UploadedLink key={song.id} song={song} />
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
