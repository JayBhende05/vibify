// import { prismaClient } from "@/lib/db";
// import { createStreamSchema } from "@/schemas/stream/stream.create";
// import { NextRequest, NextResponse } from "next/server";
// import youtubesearchapi from "youtube-search-api";

// const YTREGEX = /(?:v=|youtu\.be\/|shorts\/)([^&#?/]+)/;

// export async function POST(req: NextRequest) {
//   try {
//     // console.log(req)
//     const body = await req.json();
//     console.log(body)
//     const result = createStreamSchema.safeParse(body);

//     if (!result.success) {
//       return NextResponse.json(
//         { error: result.error },
//         { status: 400 }
//       );
//     }

//     const data = result.data;

//     const match = data.url.match(YTREGEX);
//     if (!match) {
//       return NextResponse.json(
//         { message: "Wrong Url Format" },
//         { status: 400 }
//       );
//     }

//     const extractedId = match[1];

//     const videoMetadata = await youtubesearchapi.GetVideoDetails(extractedId);
//     // console.log(videoMetadata);
//     const thumbnails = videoMetadata.thumbnail.thumbnails;
//     // console.log("thumbnails", thumbnails);
//     const sorted = [...thumbnails].sort((a, b) => a.width - b.width);
//     const smallThumbnail = sorted[sorted.length - 2];
//     const bigThumbnail = sorted[sorted.length - 1];
//     console.log(smallThumbnail )

//     const existingStream = await prismaClient.stream.findFirst({
//       where : {
//         extractedId : extractedId,
//         roomId : data.roomId
//       }
//     })

//     if(existingStream){
//       return NextResponse.json({
//       message: "Stream Already Exists",
//     });
//     }

//     await prismaClient.stream.create({
//       data: {
//         addedById: data.creatorId,
//         roomId: data.roomId,
//         url: data.url,
//         extractedId,
//         type: "Youtube",
//         title: videoMetadata.title ?? "Can't Find a Video",
//         sThumbnail: smallThumbnail.url ?? "https://www.shutterstock.com/image-photo/domestic-cat-on-white-background-260nw-2502238361.jpg",
//         bThumbnail: bigThumbnail.url ?? "https://www.shutterstock.com/image-photo/domestic-cat-on-white-background-260nw-2502238361.jpg"
//       },
//     });

//     return NextResponse.json({
//       message: "Stream created successfully",
//     });

//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error in Stream Creation", error : error  },
//       { status: 500 }
//     );
//   }
// }




// export async function GET(req: NextRequest) {
//   const creatorId = req.nextUrl.searchParams.get('creatorId');
//   const stream = await prismaClient.stream.findMany({
//     where: {
//       addedById: creatorId ?? ""
//     }
//   })

//   return NextResponse.json({
//     stream
//   })
// }


import { prismaClient } from "@/lib/db";
import { createStreamSchema } from "@/schemas/stream/stream.create";
import { NextRequest, NextResponse } from "next/server";

const YTREGEX = /(?:v=|youtu\.be\/|shorts\/)([^&#?/]+)/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = createStreamSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
    }

    const { url, roomId, creatorId } = result.data;

    const match = url.match(YTREGEX);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const extractedId = match[1];

    // 🔥 YouTube Data API v3
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "Missing YouTube API key" },
        { status: 500 }
      );
    }

    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${extractedId}&key=${apiKey}`
    );

    const ytData = await ytRes.json();

    const video = ytData?.items?.[0];

    if (!video) {
      return NextResponse.json(
        { message: "Video not found on YouTube" },
        { status: 404 }
      );
    }

    const snippet = video.snippet;

 const thumbnails = snippet?.thumbnails;

const smallThumbnail =
  thumbnails?.medium?.url ??
  thumbnails?.default?.url ??
  "";

const bigThumbnail =
  thumbnails?.maxres?.url ??
  thumbnails?.high?.url ??
  thumbnails?.medium?.url ??
  "";

    const existingStream = await prismaClient.stream.findFirst({
      where: {
        extractedId,
        roomId,
      },
    });

    if (existingStream) {
      return NextResponse.json({
        message: "Stream already exists",
      });
    }

    await prismaClient.stream.create({
      data: {
        addedById: creatorId,
        roomId,
        url,
        extractedId,
        type: "Youtube",
        title: snippet?.title ?? "Unknown Title",
        sThumbnail: smallThumbnail,
        bThumbnail: bigThumbnail,
      },
    });

    return NextResponse.json({
      message: "Stream created successfully",
    });
  } catch (error: any) {
    console.error("Stream creation error:", error);

    return NextResponse.json(
      {
        message: "Error in Stream Creation",
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const creatorId = req.nextUrl.searchParams.get("creatorId");

    const stream = await prismaClient.stream.findMany({
      where: {
        addedById: creatorId ?? undefined,
      },
    });

    return NextResponse.json({ stream });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching streams" },
      { status: 500 }
    );
  }
}