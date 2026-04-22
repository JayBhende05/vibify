import { AnimatePresence } from 'framer-motion';
import { ArrowBigDown, ArrowBigUp, Heart, Music, TrendingUp } from 'lucide-react';
import React from 'react'
import ActivityItem from './ActivityItem';
import SocialHub from './SocialHub';
import SongItem from './SongList';
import SongList from './SongList';

const songs = [
  { id : "01", title: 'Midnight City', artist: 'Neon Dreams', cover: 'https://picsum.photos/seed/music1/400/400', votes: 142, duration: '3:45' },
  { id : "02",title: 'Stardust', artist: 'Cosmic Echo', cover: 'https://picsum.photos/seed/music2/400/400', votes: 128, duration: '4:12' },
  { id : "03",title: 'Electric Vibes', artist: 'Synth Wave', cover: 'https://picsum.photos/seed/music3/400/400', votes: 95, duration: '3:20' },
  { id : "04",title: 'Lost in Translation', artist: 'The Voyagers', cover: 'https://picsum.photos/seed/music4/400/400', votes: 84, duration: '5:01' },
  { id : "05",title: 'Neon Nights', artist: 'Retro Future', cover: 'https://picsum.photos/seed/music5/400/400', votes: 76, duration: '3:58' },
  { id : "06",title: 'Neon Nights', artist: 'Retro Future', cover: 'https://picsum.photos/seed/music5/400/400', votes: 76, duration: '3:58' },
];

function Hero() {
  return (
    <>
            {/* Top Voted Hero */}
            <section className="col-span-12 h-64 relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200" 
                alt="Hero" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="relative z-20 h-full p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-lg shadow-brand/40">Now at Top</span>
                  {songs.length > 0 && (
                    <span className="text-white/60 text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                      {songs[0].votes} Upvotes
                    </span>
                  )}
                </div>
                <h1 className="text-5xl font-black mb-1 tracking-tighter drop-shadow-lg text-white">
                  {songs.length > 0 ? songs[0].title : 'Discovery Waiting'}
                </h1>
                <p className="text-xl text-white/80 font-medium mb-6 drop-shadow-md">
                  {songs.length > 0 ? songs[0].artist : 'Sign in to start the session'}
                </p>
                <div className="flex items-center gap-4">
                  <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all hover:shadow-2xl hover:scale-105 active:scale-95 shadow-xl shadow-black/50">
                    Play Now
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all group active:scale-90">
                    <Heart className="w-5 h-5 group-hover:fill-current text-white" />
                  </button>
                </div>
              </div>
            </section>

            {/* Queue Section */}
         

            {/* Social Hub */}
          {/* <SocialHub /> */}
          



    </>
      
  )
}

export default Hero
