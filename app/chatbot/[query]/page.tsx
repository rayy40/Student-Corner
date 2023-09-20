"use client";

import QueryInput from "@/components/QueryInput/QueryInput";
import { useChatStore, useUserStore } from "@/context/store";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Query() {
  const user = useUser();
  const { userId } = useUserStore();
  const { answer } = useChatStore();
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
    <div className="p-6 mt-14 max-w-[600px] mx-auto">
      <QueryInput />
      {answer?.length > 0 && (
        <div className="mt-10 text-slate">
          <h3 className="text-dark-gray font-medium py-2 border-b border-b-light-gray w-full">
            Answer:
          </h3>
          <p className="py-4 text-[0.925rem]">{answer}</p>
        </div>
      )}
    </div>
  );
}
