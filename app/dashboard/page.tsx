'use client';

import { use, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChevronUp, ChevronDown, Play } from 'lucide-react'
import axios from "axios";
import { useSession } from "next-auth/react";
import { prismaClient } from '../lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { YT_REGEX } from "@/lib/utils";
import { Appbar } from '../components/Appbar';
import { Redirect } from '../components/Redirect';



interface Song {
  "id": string,
  "type": string,
  "url": string,
  "extractedID": string,
  "title": string,
  "smallImg": string,
  "largeImg": string,
  "active": boolean,
  "userId": string,
  "thumbnail": string,
  "upvotes": number,
  "haveUpvoted": boolean
}

const REFRESH_INTERVAL_MS = 1000 * 10;

const initialSongs: Song[] = []

export default function MusicQueue() {
  const [url, setUrl] = useState('')
  const [songs, setQueue] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  //refreshStreams();

  async function fetchUserId(email: string): Promise<string | null> {
    const res = await fetch('/api/user-id', { // Implement this endpoint if you don't have it
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    if (res.ok) {
      const user = await res.json();
      return user.id; // Assuming your backend returns a JSON with { id: '...' }
    }

    console.error('Failed to fetch user id');
    return null;
  }
  async function refreshStreams() {
    const res = await fetch('/api/streams/my', {
      credentials: "include"
    });
    if (res.ok) {
      const data = await res.json();
      const streams = data.streams.map((stream: any) => ({
        id: stream.id,
        type: stream.type,
        url: stream.url,
        extractedID: stream.extractedID,
        title: stream.title,
        smallImg: stream.smallImg,
        largeImg: stream.bigImg,
        active: false, // assume default value, update logic as needed
        userId: stream.userId,
        thumbnail: stream.smallImg,
        upvotes: 0, // You may need to update this based on actual data
        haveUpvoted: false // Update this logic as needed based on user session
      }));
      setQueue(streams);
    } else {
      console.error('Failed to fetch streams');
    }
  }
  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {

  }, REFRESH_INTERVAL_MS);
}, [])

const upvote = (id: string, isUpvote: boolean) => {
  setQueue(songs.map(song => 
    song.id === id 
    ? { 
      ...song, 
      upvotes: isUpvote ? song.upvotes + 1 : song.upvotes - 1,
      haveUpvoted: !song.haveUpvoted
    } 
    : song
  ).sort((a, b) => b.upvotes - a.upvotes))

  fetch(`/api/streams/${isUpvote ? "upvote" : "downvote"}`, {
    method: "POST",
    body: JSON.stringify({
      streamId: id
    })
  })

}

const extractVideoID = (url: string): string | null => {
  const match = url.match(/[?&]v=([^&]+)/); // Finds '?v=' or '&v=' followed by the ID
  return match ? match[1] : null;
};

const { data: session } = useSession();

const addSong = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const videoId = extractVideoID(url);
    if (videoId && session?.user?.email) {
      const userId = await fetchUserId(session?.user?.email);
      const newSong: Song = {
        id: videoId,
        type: "youtube",
        url: url,
        extractedID: videoId,
        title: "Title updating soon...",
        smallImg: `https://img.youtube.com/vi/${videoId}/1.jpg`,
        largeImg: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        active: false,
        userId: userId ?? "",
        thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        upvotes: 0,
        haveUpvoted: false
      };
      const response = await fetch('/api/streams', {
        method: 'POST',
        body: JSON.stringify({
          creatorId: userId,
          url: url
        })
      });

      if (response.ok) {
        // Optionally, clear the input or update state to reflect that the song was added successfully
        setQueue([...songs, newSong]);
        setUrl('');
      } else {
        console.error('Failed to add song to backend');
      }
    } else {
      console.error('Invalid URL or user session not found');
    }
  } catch (error) {
    console.error('Invalid URL', error);
  }
};


const playNext = async () => {
  if (songs.length > 0) {
    const currentSong = songs[0]; // Get the song to play and remove
    setCurrentSong(currentSong);
    setQueue(songs.slice(1));
    console.log(currentSong.id);
    // Make an API call to remove the song from the backend
    try {
      const response = await fetch(`/api/streams/delete`, { // Use a specific delete endpoint
        method: 'DELETE',
        body: JSON.stringify({ songId: currentSong.id }), // Pass the song ID in the body
      });

      if (!response.ok) {
        console.error('Failed to delete song from backend');
      }
    } catch (error) {
      console.error('Error deleting song', error);
    }
  }
};

  return (
    <div className="min-h-screen p-4 md:p-8" style={{
      background: `
        radial-gradient(circle at 0% 0%, #1a365d 0%, transparent 50%),
        radial-gradient(circle at 100% 0%, #1e4784 0%, transparent 50%),
        radial-gradient(circle at 100% 100%, #1a365d 0%, transparent 50%),
        radial-gradient(circle at 0% 100%, #1e4784 0%, transparent 50%),
        linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #1e40af 75%, #1e3a8a 100%)
      `
    }}>
            <Appbar/>
            <Redirect/>
      <div className="max-w-2xl mx-auto space-y-6">
        <form onSubmit={addSong} className="space-y-4">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube link here"
            className="glass-effect text-blue-100 border-blue-400/20 placeholder-blue-300/50"
          />
          <Button 
            type="submit" 
            className="w-full bg-blue-400/90 text-blue-900 hover:bg-blue-300/90">
          
            Add to Queue
          </Button>
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold gradient-text">Upcoming Songs</h2>
          {songs.map((song) => (
            <Card key={song.id} className="flex items-center gap-4 p-4 glass-effect">
              <img
                src={song.thumbnail}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-blue-100 truncate">
                  {song.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-300 hover:text-blue-100"
                onClick={() => upvote(song.id, song.haveUpvoted ? false : true)}
              >
                {song.haveUpvoted ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronUp className="w-4 h-4 mr-2" />}
                {song.upvotes}
              </Button>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold gradient-text">Now Playing</h2>
          <Card className="p-4 glass-effect text-blue-100 text-center">
            {currentSong ? (
              <div className="space-y-4">
                              <iframe
          width="637"
          height="315"
          src={`https://www.youtube.com/embed/${currentSong.extractedID}`}
          title={currentSong.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
                <h3 className="text-lg font-semibold">{currentSong.title}</h3>
              </div>
            ) : (
              <p>No video playing</p>
            )}
          </Card>
          <Button 
            onClick={playNext}
            className="w-full bg-blue-400/90 text-blue-900 hover:bg-blue-300/90"
            disabled={songs.length === 0}
          >
            <Play className="w-4 h-4 mr-2" />
            Play Next
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .glass-effect {
          background: rgba(37, 99, 235, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(147, 197, 253, 0.2);
        }
        
        .gradient-text {
          background: linear-gradient(to right, #93C5FD, #DBEAFE);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  )
}

async function GETid(req: NextRequest) {
  const session = await getServerSession();
  const user = await prismaClient.user.findFirst({
      where: {
          email: session?.user?.email ?? ""
      }
  })
}
