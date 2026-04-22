import React from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Search, 
  TrendingUp, 
  Music, 
  Users, 
  Heart, 
  Share2, 
  ChevronRight,
  MoreVertical,
  ArrowBigUp,
  ArrowBigDown,
  Disc,
  LogIn,
  LogOut,
  Pause as PauseIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  votes: number;
  duration: string;
  createdBy?: string;
  isPlaying?: boolean;
}

interface DashboardProps {
  songs: Song[];
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: FirebaseUser | null;
  handleVote: (id: string, delta: number) => void;
  handleLogout: () => void;
  handleLogin: () => void;
  seedSongs: () => void;
}

export default function Dashboard({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  searchQuery,
  setSearchQuery,
  user,
  handleVote,
  handleLogout,
  handleLogin,
  seedSongs
}: DashboardProps) {
  return (
    <div className="flex h-screen bg-background text-white selection:bg-brand/30 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      {/* <aside className="w-64 border-r border-white/10 flex flex-col p-6 bg-surface z-20">
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

          {user && songs.length === 0 && (
            <button 
              onClick={seedSongs}
              className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-indigo-400 transition-colors uppercase tracking-widest"
            >
              Seed Demo Tracks
            </button>
          )}
        </div>

        <div className="mt-8">
          <div className="p-4 bg-surface-gradient rounded-xl border border-white/10">
            <p className="text-xs font-semibold mb-2">Currently Voting</p>
            <p className="text-[10px] text-white/50 leading-tight mb-3">Vote for the next track in 'Community House' room.</p>
            
            {user ? (
               <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg mb-3">
                 <img src={user.photoURL || ''} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
                 <div className="min-w-0">
                    <p className="text-[10px] font-bold truncate">{user.displayName}</p>
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
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        {/* <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-background/80 backdrop-blur-md z-10">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-brand-light transition-colors" />
            <input 
              type="text" 
              placeholder="Search for songs, vibes, or users..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/40 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
             {user ? (
               <div className="flex items-center gap-4">
                 <div className="text-right hidden sm:block">
                   <p className="text-sm font-medium tracking-tight">{user.displayName}</p>
                   <p className="text-[10px] text-brand-light font-semibold uppercase tracking-wider">Pro Curator</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 border border-white/20 overflow-hidden shadow-lg">
                   <img src={user.photoURL || ''} alt="Profile" className="w-full h-full object-cover" />
                 </div>
               </div>
             ) : (
               <button onClick={handleLogin} className="text-sm font-semibold text-white/60 hover:text-white transition-colors">
                 Sign In
               </button>
             )}
          </div>
        </header> */}

        {/* Content Area */}
        {/* <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
            *******Top Voted Hero**********
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

            ********Queue Section************
            <section className="col-span-12 lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold tracking-tight">Upcoming Playlist</h2>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-glow shadow-emerald-400/50"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Live Sync</span>
                </div>
              </div>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {songs.map((song, index) => (
                    <motion.div 
                      layout
                      key={song.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={`flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/[0.08] transition-all group cursor-pointer border border-transparent shadow-sm ${currentSong?.id === song.id ? 'bg-white/[0.1] border-white/10' : ''}`}
                      onClick={() => setCurrentSong(song)}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="text-white/20 font-mono text-sm w-4 flex-shrink-0">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md relative group-hover:shadow-indigo-500/20 transition-all">
                          <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                          {currentSong?.id === song.id && isPlaying && (
                            <div className="absolute inset-0 bg-brand/40 flex items-center justify-center backdrop-blur-[2px]">
                               <Disc className="w-6 h-6 text-white animate-spin-slow" />
                            </div>
                          )}
                        </div>
                        <div className="truncate">
                          <p className={`font-bold truncate tracking-tight ${currentSong?.id === song.id ? 'text-brand-light' : ''}`}>{song.title}</p>
                          <p className="text-xs text-white/40 font-medium truncate">{song.artist}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <motion.div 
                          className="text-right"
                          initial={false}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-xs font-bold text-brand-light">+{song.votes}</p>
                          <p className="text-[9px] text-white/30 uppercase font-black tracking-tighter">Votes</p>
                        </motion.div>
                        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5">
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               handleVote(song.id, 1);
                             }}
                             className="p-2 rounded-full border border-transparent hover:bg-brand hover:border-brand text-white transition-all active:scale-90"
                           >
                             <ArrowBigUp className="w-4 h-4 fill-current" />
                           </button>
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               handleVote(song.id, -1);
                             }}
                             className="p-2 rounded-full border border-transparent hover:bg-red-500 hover:border-red-500 text-white transition-all active:scale-90"
                           >
                             <ArrowBigDown className="w-4 h-4 fill-current" />
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {songs.length === 0 && (
                  <div className="py-24 flex flex-col items-center justify-center text-white/10 gap-2 border-2 border-dashed border-white/5 rounded-3xl">
                    <Music className="w-12 h-12" />
                    <p className="text-sm font-medium italic">Music room is currently empty</p>
                  </div>
                )}
              </div>
            </section>

            ********* Social Hub **************
            <aside className="col-span-12 lg:col-span-4">
              <h2 className="text-xl font-bold tracking-tight mb-6 text-white">Social Hub</h2>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full group-hover:bg-indigo-500/20 transition-all"></div>
                
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Live Activity</p>
                <div className="flex flex-col gap-4 relative z-10">
                  <ActivityItem emoji="🔥" user="Sarah J." action="upvoted" track="Heat Waves" time="2 mins ago" />
                  <ActivityItem emoji="✨" user="Mike D." action="shared" track="Late Night Room" time="15 mins ago" />
                  <ActivityItem emoji="🎧" user="Elena K." action="listening" track="Stardust" time="Jut now" />
                </div>

                <div className="h-px bg-white/10 my-1"></div>
                
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">142 Active in Room</p>
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-[10px] font-bold shadow-lg">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-surface flex items-center justify-center text-[10px] font-bold text-white/60">
                      +137
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                  Invite Friends
                </button>
              </div>

              <div className="mt-8 p-6 glass rounded-3xl border-indigo-500/20 bg-indigo-500/5">
                 <h4 className="font-bold text-sm mb-2 flex items-center gap-2 tracking-tight">
                   <TrendingUp className="w-4 h-4 text-indigo-400" />
                   Upvoting Tips
                 </h4>
                 <p className="text-[11px] text-white/50 leading-relaxed">
                   The song at position #01 is played automatically. Keep voting to keep your favorite tracks alive!
                 </p>
              </div>
            </aside>
          </div>
        </div> */}
      </main>

      {/* Floating Player Bar */}
      {/* <AnimatePresence>
        {currentSong && (
          <motion.footer 
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 h-24 bg-black/40 backdrop-blur-xl border-t border-white/10 px-8 flex items-center justify-between z-50 text-white"
          >
            <div className="flex items-center gap-4 w-1/3">
              <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden border border-white/20 shadow-lg group relative cursor-pointer">
                <img src={currentSong.cover} alt="Now Playing" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <ChevronRight className="w-5 h-5 rotate-90 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate tracking-tight">{currentSong.title}</p>
                <p className="text-xs text-white/40 font-medium truncate">{currentSong.artist}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 w-1/3">
              <div className="flex items-center gap-6">
                <SkipBack className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors active:scale-90" />
                <button 
                   onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-white/10 hover:scale-105 active:scale-95 transition-all outline-none"
                >
                  {isPlaying ? <PauseIcon className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                <SkipForward className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors active:scale-90" />
              </div>
              <div className="flex items-center gap-3 w-full max-w-md">
                <span className="text-[10px] text-white/30 font-mono">1:42</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden group cursor-pointer">
                  <motion.div 
                    className="absolute inset-0 bg-brand-gradient" 
                    animate={{ width: isPlaying ? '100%' : '45%' }}
                    transition={{ duration: isPlaying ? 210 : 0.5, ease: "linear" }}
                  />
                </div>
                <span className="text-[10px] text-white/30 font-mono">{currentSong.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-6 w-1/3">
              <div className="flex items-center gap-3 w-32 group">
                 <Volume2 className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                 <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                   <div className="w-[70%] h-full bg-white/60 rounded-full"></div>
                 </div>
              </div>
              <MoreVertical className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
            </div>
          </motion.footer>
        )}
      </AnimatePresence> */}
    </div>
  );
}

// function ActivityItem({ emoji, user, action, track, time }: { emoji: string, user: string, action: string, track: string, time: string }) {
//   return (
//     <div className="flex gap-4 group cursor-pointer">
//       <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-xs shadow-inner">
//         {emoji}
//       </div>
//       <div className="text-[11px] leading-tight">
//         <span className="font-bold text-white/90">{user}</span>
//         <span className="text-white/40"> {action} </span>
//         <span className="text-brand-light font-semibold tracking-tight">{track}</span>
//         <p className="text-[10px] text-white/20 mt-1 font-medium">{time}</p>
//       </div>
//     </div>
//   );
// }




// function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
//   return (
//     <button className={`
//       flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all w-full text-left font-medium text-sm
//       ${active 
//         ? 'bg-white/10 text-white shadow-sm' 
//         : 'text-white/60 hover:text-white hover:bg-white/5'}
//     `}>
//       {icon}
//       <span>{label}</span>
//       {active && <motion.div layoutId="activeNav" className="ml-auto w-1 h-1 bg-brand rounded-full shadow-[0_0_8px_var(--color-brand)]" />}
//     </button>
//   );
// }
