import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { songId } = await req.json(); // Extract songId from request body
    console.log('Deleting song with ID:', songId);
    if (!songId) {
      return NextResponse.json({ error: 'No song ID provided' }, { status: 400 });
    }

    // Delete the song entry from the database
    await prismaClient.stream.delete({
      where: { id: songId },
    });

    return NextResponse.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Error deleting song:', error);
    return NextResponse.json({ error: 'Failed to deletee song' }, { status: 500 });
  }
}