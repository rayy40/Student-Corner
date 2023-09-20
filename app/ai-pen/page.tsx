"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import AiInput from "@/components/AiInput/AiInput";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect } from "react";
import { useNotepadStore, useUserStore } from "@/context/store";
import { useUser } from "@clerk/clerk-react";

export default function AiPen() {
  const { setDocumentId } = useNotepadStore();
  const { userId } = useUserStore();
  const router = useRouter();
  const user = useUser();

  if (!user?.isSignedIn) {
    router.push("/sign-in");
  }

  if (!userId) {
    router.push("/");
  }

  const pageEntries = useQuery(api.aipen.getDocumentsByUserId, {
    userId: userId as Id<"users">,
  });

  useEffect(() => {
    if (pageEntries?.length) {
      const documentId = pageEntries?.[pageEntries?.length - 1]?._id;
      setDocumentId(documentId);
      router.push(`/ai-pen/${documentId}`);
    }
  }, [pageEntries, router, setDocumentId]);

  return (
    <div className="p-6 mt-14 max-w-[600px] mx-auto">
      <AiInput />
    </div>
  );
}
