import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const UpvoteSchema = z.object({
    streamId: z.string(),

})
export async function POST(req: NextRequest){
    const session = await getServerSession();



    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    if(!user)
        {
            return NextResponse.json({
                message: "you can't do that"
                }, {
                status: 403
            })
        }

    try{
        const data = UpvoteSchema.parse(await req.json())
        await prismaClient.upvotes.create({
            data: {
                userId: user.id,
                streamId: data.streamId
            }
        }); 
        return NextResponse.json({message: "success"})
    } catch(e){
        return NextResponse.json({
            message: "error upvoting"
            }, {
            status: 403
        })
    }
}