"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music } from 'lucide-react'

export function Appbar()
{
    const session = useSession();
    return <div className="flex justify-between px-5">
        <div className = "text-lg font bold flex flex-col items-justify-center">
        <Link className="flex items-center justify-center" href="#">
          <Music className="h-6 w-6 mr-2 text-blue-300" />
          <span className="font-bold text-blue-100">MusicGuru</span>
        </Link>
        </div>
        <div>
            {session.data?.user && <Button className = "bg-blue-400/90 text-blue-900 hover:bg-blue-300/90 transition-colors" onClick={() => signOut()}>Logout</Button>}
            {!session.data?.user && <Button className = "bg-blue-400/90 text-blue-900 hover:bg-blue-300/90 transition-colors" onClick={() => signIn()}>Sign In</Button>}
        </div>
    </div>
}