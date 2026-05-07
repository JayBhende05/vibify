// "use client"
"use client"
import React, { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import RoomHeader from './components/RoomHeader';
// import NowPlaying from './components/NowPlaying';
// import SongQueue from './components/SongQueue';
// import AddSong from './components/AddSong';
// import PlayerBar from './components/PlayerBar';
// import { Song, User, Room } from './types';
import { TrendingUp, Activity, Music } from 'lucide-react';
import { ActivityToggle } from '@/components/room/ActivityToggle';
import RoomHeader from '@/components/room/Header';
import NowPlaying from '@/components/room/NowPlaying';
import AddSong from '@/components/room/AddSong';
import SongQueue from '@/components/room/SongQueue';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { getRoomDetails } from '@/actions/room.actions';
import { string } from 'zod';
import { useRoomDetails } from '@/store/room';


export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  votes: number;
  duration: string;
  addedBy: string;
}

export interface User {
  id: string;
  displayName: string;
  photoURL: string;
  role: 'host' | 'participant';
}

export interface Room {
  id: string;
  name: string;
  hostName: string;
  activeUsers: number;
}
// Mock Initial Data
const MOCK_USER: User = {
  id: 'u1',
  displayName: 'Jay Bhende',
  photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
  role: 'host'
};

const MOCK_ROOM: Room = {
  id: 'RO-X92-2024',
  name: 'Midnight Chill 🌌',
  hostName: 'Jay Bhende',
  activeUsers: 42
};

const INITIAL_SONGS: Song[] = [
  {
    id: 's1',
    title: 'Stardust Oasis',
    artist: 'Lofi Girl',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200',
    votes: 12,
    duration: '3:45',
    addedBy: 'Sarah J.'
  },
  {
    id: 's2',
    title: 'Neon Dreams',
    artist: 'Vintage Culture',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200',
    votes: 8,
    duration: '4:12',
    addedBy: 'Mike D.'
  },
  {
    id: 's3',
    title: 'Midnight City',
    artist: 'M83',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    votes: 5,
    duration: '3:58',
    addedBy: 'Elena K.'
  }
];

export default  function App() {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [currentSong, setCurrentSong] = useState<Song | null>(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  



  // Sorting logic based on votes
  const sortedSongs = [...songs].sort((a, b) => b.votes - a.votes);

  const handleVote = (songId: string) => {
    setSongs(prev => prev.map(s => 
      s.id === songId ? { ...s, votes: s.votes + 1 } : s
    ));
    // Visual feedback would be handled by framer-motion layout prop automatically
  };

  const handleAddSong = (url: string) => {
    const newSong: Song = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Vibe Found', // In real app, fetch metadata from URL
      artist: 'Unknown Artist',
      cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1200',
      votes: 0,
      duration: '4:00',
      addedBy: MOCK_USER.displayName
    };
    setSongs(prev => [...prev, newSong]);
  };

  const handleRemove = (songId: string) => {
    setSongs(prev => prev.filter(s => s.id !== songId));
  };

  const handleSkip = () => {
    if (sortedSongs.length > 0) {
      setCurrentSong(sortedSongs[0]);
    }
  };

  const {data: session} =  useSession();
const params = useParams();
const roomId = params.roomId;
const setRoomData = useRoomDetails((s) => s.setRoomDetails)
const RoomData = useRoomDetails((s) => s.RoomDetails)

 const UserDetails: User = {
  id: session?.user.id || "",
  displayName: session?.user.name || "",
  photoURL: session?.user.image || "",
  role: 'host'
};


useEffect(() => {
  async function fetchRoom() {
    const roomData = await getRoomDetails(roomId);
    console.log("Room Details are ", roomData);
    if(roomData.success){
      setRoomData(roomData);
    }
  }
  fetchRoom()
}, [roomId])


  return (
    <div className="flex min-h-screen bg-surface font-sans selection:bg-brand/30">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto px-8 py-10 pb-40">
            <RoomHeader room={MOCK_ROOM} />

            <div className="grid grid-cols-12 gap-10">
              {/* Main Content */}
              <div className="col-span-12 lg:col-span-8">
                <NowPlaying 
                  song={sortedSongs[0]} 
                  user={UserDetails} 
                  onSkip={handleSkip}
                />
                
                <AddSong  />
                
                <SongQueue 
                  songs={sortedSongs} 
                  user={MOCK_USER} 
                  onVote={handleVote}
                  onRemove={handleRemove}
                  currentSongId={currentSong?.id}
                  isPlaying={isPlaying}
                />
              </div>

              {/* Side Panels */}
              <aside className="col-span-12 lg:col-span-4 space-y-10">
                {/* Social Hub */}
                <div className="glass rounded-[2.5rem] p-8 relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand/10 blur-[60px] rounded-full group-hover:bg-brand/20 transition-all duration-700"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-xl font-black tracking-tight mb-8 flex items-center gap-3">
                      <Activity className="w-5 h-5 text-brand-light" />
                      Social Pulse
                    </h2>
                    
                    <div className="space-y-6 mb-8">
                      <ActivityToggle icon="🔥" user="Sarah J." action="upvoted" track="Stardust Oasis" time="2m ago" />
                      <ActivityToggle icon="✨" user="Mike D." action="added" track="Neon Dreams" time="15m ago" />
                      <ActivityToggle icon="🎧" user="Elena K." action="joined" track="the room" time="Just now" />
                    </div>

                    <div className="h-px bg-white/5 my-8"></div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <span>Active Curators</span>
                        <span className="text-brand-light">42 online</span>
                      </div>
                      <div className="flex -space-x-3">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-[3px] border-surface bg-gradient-to-tr from-brand to-purple-600 flex items-center justify-center text-xs font-black shadow-xl ring-1 ring-white/10">
                            {String.fromCharCode(64 + i)}
                          </div>
                        ))}
                        <div className="w-10 h-10 rounded-full bg-white/5 border-[3px] border-surface flex items-center justify-center text-[11px] font-black text-white/40 ring-1 ring-white/10">
                          +37
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight Panel */}
                <div className="p-8 rounded-[2rem] bg-brand-gradient/5 border border-brand/20 relative overflow-hidden">
                   <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                   <h4 className="font-black text-sm mb-3 flex items-center gap-2 tracking-widest uppercase">
                     <TrendingUp className="w-4 h-4 text-brand-light" />
                     Room Insight
                   </h4>
                   <p className="text-xs text-white/50 leading-relaxed font-medium pr-6">
                     The track at <span className="text-brand-light font-bold">#01</span> is currently synced across all devices. Keep the votes flowing to maintain the pulse!
                   </p>
                </div>

                {/* Recent Items / Empty Spot */}
                <div className="border border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-3 bg-white/[0.01]">
                   <Music className="w-8 h-8 text-white/10" />
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Syncing History...</p>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>

      {/* <PlayerBar 
        currentSong={currentSong || sortedSongs[0]} 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)} 
      /> */}
    </div>
  );
}


