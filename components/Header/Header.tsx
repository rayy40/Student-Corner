import React, { useRef, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isLoading, isAuthenticated } = useConvexAuth();

  const UserProfile = () => {
    const initials =
      (user?.fullName?.slice(0, 1) || "") + (user?.fullName?.slice(1, 2) || "");
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useOutsideClick(ref, () => {
      setIsDropDownOpen(false);
    });

    return (
      <div
        className="relative p-2 w-10 h-10 uppercase flex items-center justify-center shadow-[inset_0_0_4px_-2px_rgba(0,0,0,0.5)] bg-light-gray rounded-full cursor-pointer"
        onClick={() => setIsDropDownOpen((prev) => !prev)}
      >
        {initials}
        {isDropDownOpen && (
          <div
            ref={ref}
            className="absolute top-12 rounded-md right-0 w-[150px] bg-light-gray shadow-[0_0_6px_-2px_rgba(0,0,0,0.5)]"
          >
            <ul>
              <li className="capitalize text-xs p-2 rounded-t-md border-b border-dark-gray  hover:bg-hover-light-gray">
                Dashboard
              </li>
              <li
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                className="capitalize text-xs p-2 rounded-b-md hover:bg-hover-light-gray"
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed z-10 top-0 flex justify-between items-center w-screen bg-white py-3 pl-6 pr-8 h-14 border-b border-light-gray shadow">
      <Link href={"/"}>
        <Image
          src="/images/icons8-student-50.png"
          width={"35"}
          height={"35"}
          alt="Your Name"
        />
      </Link>
      <div className="text-dark-gray font-medium flex gap-14 items-center">
        <Link
          className="hover:text-slate hover:underline underline-offset-4"
          href={"/quizify"}
        >
          Quizify
        </Link>
        <Link
          className="hover:text-slate hover:underline underline-offset-4"
          href={"/ai-pen"}
        >
          Ai-Pen
        </Link>
        <Link
          className="hover:text-slate hover:underline underline-offset-4"
          href={"/chatbot"}
        >
          ChatBot
        </Link>
      </div>
      {isAuthenticated ? (
        <UserProfile />
      ) : (
        <Link href={"/sign-in"}>
          <button className="px-4 py-2 text-sm text-white bg-slate hover:opacity-90 rounded-md">
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
}
