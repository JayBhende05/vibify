// "use client"

import RoomHeader from "@/components/room/Header";

import { getRoomDetails } from "@/actions/room.actions";
import AddSong from "@/components/room/AddSong";
import SongQueue from "@/components/room/SongQueue";
import { getSong } from "@/actions/song.action";
import NowPlaying from "@/components/room/NowPlaying";
// import { useRoomDetails } from '@/store/room';

export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  console.log("RoomId:", roomId);

  const roomDetails = await getRoomDetails(roomId);

  const Songs = await getSong(roomId);

const sortedSongs = [...Songs.songs].sort(
  (a, b) => (b?._count?.upvotes ?? 0) - (a?._count?.upvotes ?? 0)
);

const currentSong = sortedSongs[0];
const queueSongs = sortedSongs.slice(1);

  return (
    <>
      <div className="flex min-h-screen bg-surface font-sans selection:bg-brand/30">
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto px-8 py-10 pb-40">
              <RoomHeader room={roomDetails} />
            </div>
            <div className="grid grid-cols-12 gap-10">
              {/* Main Content */}
              <div className="col-span-12 lg:col-span-8">
                <NowPlaying
                                  song={currentSong}
                                  user={{role : "host"}}

                  />
                
                <AddSong  roomId={roomId} />
                
                <SongQueue 
                   songs={queueSongs}
  currentSongId={currentSong?.id}
  isPlaying={currentSong?.id}
                 />
              </div>

              
            </div>
          </main>
        </div>
    
        {/* <PlayerBar 
//         currentSong={currentSong || sortedSongs[0]} 
//         isPlaying={isPlaying} 
//         onTogglePlay={() => setIsPlaying(!isPlaying)} 
//       /> */}
      </div>
    </>
  );
}

// export default  async function Page({
//   params: any }) {
//    const resolvedParams = await params; // ✅ unwrap

//   const roomId = resolvedParams.roomId;

//   console.log("RoomId:", roomId);

//   return (
//     <div className="flex min-h-screen bg-surface font-sans selection:bg-brand/30">
//       <div className="flex-1 flex flex-col min-w-0">
//         <main className="flex-1 overflow-y-auto custom-scrollbar">
//           <div className="max-w-7xl mx-auto px-8 py-10 pb-40">
//             {/* <RoomHeader room={MOCK_ROOM} /> */}

//           </div>
//         </main>
//       </div>

//       {/* <PlayerBar
//         currentSong={currentSong || sortedSongs[0]}
//         isPlaying={isPlaying}
//         onTogglePlay={() => setIsPlaying(!isPlaying)}
//       /> */}
//     </div>
//   );
// }
