import { prismaClient } from "@/lib/db";
import { createStreamSchema } from "@/types/stream/stream.create";
import { NextRequest, NextResponse } from "next/server";
import youtubesearchapi from "youtube-search-api";

const YTREGEX = /(?:v=|youtu\.be\/|shorts\/)([^&#?/]+)/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createStreamSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    const data = result.data;

    const match = data.url.match(YTREGEX);
    if (!match) {
      return NextResponse.json(
        { message: "Wrong Url Format" },
        { status: 400 }
      );
    }

    const extractedId = match[1];

    const videoMetadata = await youtubesearchapi.GetVideoDetails(extractedId);
    // console.log(videoMetadata);
    const thumbnails = videoMetadata.thumbnail.thumbnails;
    // console.log("thumbnails", thumbnails);
    const sorted = [...thumbnails].sort((a, b) => a.width - b.width);
    const smallThumbnail = sorted[sorted.length - 2];
    const bigThumbnail = sorted[sorted.length - 1];
    console.log(smallThumbnail )

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: videoMetadata.title ?? "Can't Find a Video",
        sThumbnail: smallThumbnail.url ?? "https://www.shutterstock.com/image-photo/domestic-cat-on-white-background-260nw-2502238361.jpg",
        bThumbnail: bigThumbnail.url ?? "https://www.shutterstock.com/image-photo/domestic-cat-on-white-background-260nw-2502238361.jpg"
      },
    });

    return NextResponse.json({
      message: "Stream created successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Error in Stream Creation", error : error  },
      { status: 500 }
    );
  }
}




export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get('creatorId');
  const stream = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? ""
    }
  })

  return NextResponse.json({
    stream
  })
}