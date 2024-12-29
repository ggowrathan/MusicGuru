
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
//@ts-ignore
import youtubesearchapi from 'youtube-search-api';
import { YT_REGEX } from "@/lib/utils";




const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()

})


export async function POST(req: NextRequest){

    try {
    
        const data = CreateStreamSchema.parse(await req.json());
    
        const isYt = data.url.match(YT_REGEX);
    
        if (!isYt) {
            console.log("Invalid YouTube URL:", data.url);
            return NextResponse.json({
                message: "Error adding song :("
            }, {
                status: 411
            });
        }
    
        const extractedID = data.url.split("?v=")[1];
    
        const res = await youtubesearchapi.GetVideoDetails(extractedID);
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: {width: number}, b: {width: number}) => a.width < b.width ? 1 : -1);
    
        const streamData = {
            userId: data.creatorId,
            url: data.url,
            extractedID, 
            type: "Youtube"
        };
    
        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedID, 
                type: "Youtube",
                title: res.title ?? "Can't find video (what are you adding??)",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "data:image/jpeg;base64,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",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "data:image/jpeg;base64,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"
            }
        });
    
        return NextResponse.json({
            message: "Successfully added song :)",
            id: stream.id
        });
    } catch (e) {
        console.error("Error in POST handler:", e);
        return NextResponse.json({
            message: "Error adding song :(("
        }, {
            status: 411
        });
    }
    
}
export async function GET(req: NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({streams})
}


//need to fix regex