import RoomHeader from "@/components/room/Header";
import { getRoomDetails } from "@/actions/room.actions";
import AddSong from "@/components/room/AddSong";
import SongQueue from "@/components/room/SongQueue";
import { getSong } from "@/actions/song.action";
import NowPlaying from "@/components/room/NowPlaying";
import { GetSongResponse, Songs } from "@/schemas/songs/getSong";
import { GetRoomDetailsResponse } from "@/schemas/room/getRoomDetails";



export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  const roomDetails : GetRoomDetailsResponse = await getRoomDetails(roomId);

  const Songs: GetSongResponse = await getSong(roomId);

  const songList: Songs[] = Songs.success ? Songs.songs : [];

  const sortedSongs = [...songList].sort(
    (a, b) => (b._count?.upvotes ?? 0) - (a._count?.upvotes ?? 0)
  );

  const currentSong = sortedSongs[0];
  const queueSongs = sortedSongs.slice(1);
  const ROLE = roomDetails.success ? roomDetails.role : "USER"
  return (
    <div className="flex flex-col gap-8 p-8">
      <RoomHeader room={roomDetails} />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <NowPlaying song={currentSong} user={{ role: ROLE }} />

          <AddSong roomId={roomId} />

          <SongQueue
            songs={queueSongs}
            currentSongId={currentSong?.id}
            isPlaying={!!currentSong?.id}
            role={ROLE}
            roomId={roomDetails.success ? roomDetails.roomId : ""}
          />
        </div>
      </div>
    </div>
  );
}
