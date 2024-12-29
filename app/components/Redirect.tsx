"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect()
{
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.user) {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
    }, [session])
    return null
}