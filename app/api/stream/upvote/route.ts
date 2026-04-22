import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';

const upvoteStreamSchema = z.object({
  streamId : z.string()
})

export async function POST(req:NextRequest){
  const session = await getServerSession();

  const user = prismaClient.user.findFirst({
    where:{
      email : session?.user?.email ?? ""
    }
  })

  if(!user){
    return NextResponse.json({
      message : "Unauthenticated"
    }, {status : 403})
  }


  try {
    const result = upvoteStreamSchema.safeParse(await req.json());
    if(!result.success){
      return NextResponse.json({
        message : result.error
      }, {status : 411})
    }
    const data = result.data;

    await prismaClient.upvote.create({
      data : {
        userId : user?.id,
        streamId : data?.streamId ?? ""
      }
    })


  } catch (error) {
     return NextResponse.json(
      { message: "Error in Upvote" },
      { status: 500 }
    );
  }
}