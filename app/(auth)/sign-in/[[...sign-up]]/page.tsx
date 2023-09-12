"use client";

import { useState } from "react";
import { useSignIn, SignIn } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import Link from "next/link";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        setError(null);
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err?.errors[0].message);
    }
  };

  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-[360px] p-3 flex flex-col gap-5 items-center">
        <h2 className="text-2xl font-medium">Sign In</h2>{" "}
        <form className="w-full flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <input
              className="text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              className="text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && (
            <div className="w-full flex items-center justify-center">
              <p className="text-xs text-sign-in">{error}</p>
            </div>
          )}
          <button
            className="text-sm w-full p-2 h-[36px] flex items-center justify-center bg-sign-in-background text-sign-in shadow-[inset_0_0_0_1px_rgba(235,87,87,0.3)] rounded-md"
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <div className="relative mt-4 border-t border-light-gray">
            <span className="text-xs bg-white text-light-gray px-2 absolute top-[-12.5px] left-[50%] translate-x-[-50%] ">
              or
            </span>
            <button className="mt-6 w-full p-4 h-[36px] text-xs bg-light-gray flex gap-2 items-center justify-center shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md hover:bg-hover-light-gray transition-all">
              <FaGoogle color={"gray"} />
              Sign in with Google
            </button>
          </div>
        </form>
        <div className="flex mt-2 items-center justify-center">
          <p className="text-xs text-dark-gray">
            No account?{" "}
            <Link href="/sign-up" className="text-slate cursor-pointer">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
