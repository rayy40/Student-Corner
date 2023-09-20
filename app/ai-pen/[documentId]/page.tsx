"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import Editor from "@/components/Editor/Editor";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/context/store";
import { useEffect } from "react";

export default function Document() {
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
    <div className="relative flex">
      <div className="h-screen bg-input-background sticky top-0 bottom-0 shadow-[0_0_6px_1px_rgba(0,0,0,0.1)]">
        <Sidebar />
      </div>
      <div className="p-10 overflow-x-auto mt-12 mx-auto max-w-[800px] w-[800px]">
        <Editor />
      </div>
    </div>
  );
}
