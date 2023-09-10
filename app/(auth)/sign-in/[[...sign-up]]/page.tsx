"use client"

import {useState} from "react";
import { useSignIn } from "@clerk/clerk-react"
import {useRouter} from "next/navigation";
import Link from "next/link"

export default function SignInPage() {
  const {isLoaded, signIn,setActive} = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/")
      }
      else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }

    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
    }
  }

  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-[360px] p-3 flex flex-col gap-5 items-center">
        <h2 className="text-2xl font-medium">Sign In</h2>       <form className="w-full flex flex-col gap-2">
          <div className="flex flex-col gap-1">
          <input className="text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
          </div>
          <div className="flex flex-col gap-1">
          <input className="text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </div>
          <button className="text-sm w-full p-2 h-[36px] flex items-center justify-center bg-sign-in-background text-sign-in shadow-[inset_0_0_0_1px_rgba(235,87,87,0.3)] rounded-md" type="submit" onClick={handleSubmit}>
            Sign In
          </button>
        </form>
        <div className="flex mt-2 items-center justify-center">
            <p className="text-xs text-dark-gray">No account? <Link href="/sign-up" className="text-slate cursor-pointer">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}