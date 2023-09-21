"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import Link from "next/link";
// import { FaGoogle } from "react-icons/fa6";
import Loading from "@/components/Loading/Loading";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPendingVerification, setIsPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoaded || isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setIsPendingVerification(true);
      setError(null);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err?.errors[0].longMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp?.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp?.status === "complete") {
        setError(null);
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err?.errors[0].longMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen 2-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-[360px] p-3 flex flex-col gap-5 items-center">
        <h2 className="text-2xl font-medium">Sign Up</h2>
        {!isPendingVerification && (
          <form className="w-full flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <input
                className="w-1/2 text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
                id="first name"
                type="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
              <input
                className="w-1/2 text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
                id="last name"
                type="name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                className="text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
                autoComplete={"on"}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                className="text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
                id="password"
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
              Sign Up
            </button>
            {/* <div className="relative mt-4 border-t border-light-gray">
              <span className="text-xs bg-white text-light-gray px-2 absolute top-[-12.5px] left-[50%] translate-x-[-50%] ">
                or
              </span>
              <button className="mt-6 w-full p-4 h-[36px] text-xs bg-light-gray flex gap-2 items-center justify-center shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md hover:bg-hover-light-gray transition-all">
                <FaGoogle color={"gray"} />
                Sign up with Google
              </button>
            </div> */}
          </form>
        )}
        {isPendingVerification && (
          <form className="w-full flex flex-col gap-2 items-center justify-center">
            <input
              className="w-full text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
              value={code}
              placeholder="Enter your verification code"
              onChange={(e) => setCode(e.target.value)}
            />
            {error && (
              <div className="w-full flex items-center justify-center">
                <p className="text-xs text-sign-in">{error}</p>
              </div>
            )}
            <button
              className="text-sm w-full p-2 h-[36px] flex items-center justify-center bg-sign-in-background text-sign-in shadow-[inset_0_0_0_1px_rgba(235,87,87,0.3)] rounded-md"
              type="submit"
              onClick={onPressVerify}
            >
              Verify Email
            </button>
          </form>
        )}
        <div className="flex mt-2 items-center justify-center">
          <p className="text-xs text-dark-gray">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-slate cursor-pointer">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
