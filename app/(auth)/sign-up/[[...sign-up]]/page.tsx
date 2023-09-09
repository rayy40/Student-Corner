"use client"

import { SignUp } from "@clerk/clerk-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center bg-white">
        <SignUp />
        <div className="flex items-center justify-center">
            <p className="text-xs text-light-gray">Already have an account? <Link href="/sign-in" className="text-slate cursor-pointer">Sign In</Link></p>
        </div>
    </div>
  )
}