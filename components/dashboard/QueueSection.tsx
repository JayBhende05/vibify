import { AnimatePresence } from 'framer-motion'
import React from 'react'
import SongList from './SongList'
import { Music } from 'lucide-react'

const songs = [
  { id : "01", title: 'Midnight City', artist: 'Neon Dreams', cover: 'https://picsum.photos/seed/music1/400/400', votes: 142, duration: '3:45' },
  { id : "02",title: 'Stardust', artist: 'Cosmic Echo', cover: 'https://picsum.photos/seed/music2/400/400', votes: 128, duration: '4:12' },
  { id : "03",title: 'Electric Vibes', artist: 'Synth Wave', cover: 'https://picsum.photos/seed/music3/400/400', votes: 95, duration: '3:20' },
  { id : "04",title: 'Lost in Translation', artist: 'The Voyagers', cover: 'https://picsum.photos/seed/music4/400/400', votes: 84, duration: '5:01' },
  { id : "05",title: 'Neon Nights', artist: 'Retro Future', cover: 'https://picsum.photos/seed/music5/400/400', votes: 76, duration: '3:58' },
  { id : "06",title: 'Neon Nights', artist: 'Retro Future', cover: 'https://picsum.photos/seed/music5/400/400', votes: 76, duration: '3:58' },
];
function QueueSection() {
  return (
    <>
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
                  {/* *****Remaining to be Updated *********** */}
                  {/* *****Remaining to be Updated *********** */}
                  {songs.map((song, index) => (
                    // <SongItem key={song.id} song={song} index={index} {...props} />
                    <SongList key={song.id} song={song} index={index}  />
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
    </>
  )
}

export default QueueSection
