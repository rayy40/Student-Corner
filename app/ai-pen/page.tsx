"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import AiInput from "@/components/AiInput/AiInput";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect } from "react";
import { useNotepadStore, useUserStore } from "@/context/store";
import { useUser } from "@clerk/clerk-react";
import Loading from "@/components/Loading/Loading";

export default function AiPen() {
  const { setDocumentId } = useNotepadStore();
  const { userId } = useUserStore();
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user?.isSignedIn) {
      router.push("/sign-in");
    }

    if (!userId) {
      router.push("/");
    }
  }, [user, userId, router]);

  const pageEntries = useQuery(
    api.aipen.getDocumentsByUserId,
    userId !== null ? { userId: userId as Id<"users"> } : "skip"
  );

  useEffect(() => {
    // Ensure pageEntries has data and is not empty before updating state
    if (pageEntries && pageEntries.length > 0) {
      const documentId = pageEntries[pageEntries.length - 1]._id;
      setDocumentId(documentId);
      router.push(`/ai-pen/${documentId}`);
    }
  }, [pageEntries, setDocumentId, router]);

  if (!pageEntries) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!pageEntries?.length) {
    return (
      <div className="p-6 mt-14 max-w-[600px] mx-auto">
        <AiInput />
      </div>
    );
  }
}
