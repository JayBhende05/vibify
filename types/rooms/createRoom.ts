export type Room = {
  roomId: string;
  roomName: string;
  hostId: string;
  hostName: string | null;
  activeUsers: number;
};

export type RoomsResponse =
  | {
      success: true;
      rooms: Room[];
    }
  | {
      success: false;
      error: string;
    };

