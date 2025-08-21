'use client'
 
import { redirect } from 'next/navigation'
export default function Error({error, reset}: {error: Error & { digest?: string }, reset: () => void}) {
    console.log("Error occurred:", error);
    console.log("Reset:", reset);
    redirect("/login");
}