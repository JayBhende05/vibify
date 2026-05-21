import { Provider, StreamType } from "@prisma/client";

/* =========================
   Basic Uploaded Song Type
========================= */

export type UploadedSong = {
  id: string;
  sThumbnail: string | null;
  title: string | null;
  url: string;
};

/* =========================
   Uploaded Songs Response
========================= */

export type GetUploadedSongResponse =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      songs: UploadedSong[];
    };

/* =========================
   User Type
========================= */

export interface User {
  id: string;
  name: string;
  email: string;
  provider: Provider;
}

/* =========================
   Full Song Type
========================= */

export type Song = {
  id: string;

  title: string | null;

  type: StreamType;

  roomId: string;

  url: string;

  extractedId: string;

  sThumbnail: string | null;

  bThumbnail: string | null;

  active: boolean;

  addedById: string;

  createdAt: Date;

  updatedAt: Date;

  addedBy: User;

  _count: {
    upvotes: number;
  };
};

/* =========================
   Song Response
========================= */

// export type GetSongResponse =
//   | {
//       success: false;
//       error: string;
//     }
//   | {
//       success: true;
//       songs: Song[];
//     };