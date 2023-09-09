"use client"

import { SignIn } from "@clerk/clerk-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center bg-white">
        <SignIn />
        <div className="flex items-center justify-center">
            <p className="text-xs text-light-gray">No acccount? <Link href="/sign-up" className="text-slate cursor-pointer">Sign Up</Link></p>
        </div>
    </div>
  )
}