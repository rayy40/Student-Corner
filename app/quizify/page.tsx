"use client";

import QuizGenerator from "@/components/QuizGenerator/QuizGenerator";
import TypeDropDown from "@/components/TypeDropDown/TypeDropDown";
import { useUserStore } from "@/context/store";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Quizify() {
  const user = useUser();
  const { userId } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user?.isSignedIn) {
      router.push("/sign-in");
    }

    if (!userId) {
      router.push("/");
    }
  }, [user, userId, router]);
  return (
    <div className="max-w-[500px] mx-auto min-h-screen flex flex-col items-start justify-center">
      <h2 className="mt-20 text-xl">Quizify</h2>
      {/* <div className="flex gap-2 items-center">
        Type: <TypeDropDown />
      </div> */}
      <div className="-mt-20 w-full flex-grow flex justify-center items-center">
        <QuizGenerator />
      </div>
    </div>
  );
}
