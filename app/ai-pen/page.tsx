"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import AiInput from "@/components/AiInput/AiInput";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect } from "react";
import { useNotepadStore } from "@/context/store";

export default function AiPen() {
  const { setDocumentId } = useNotepadStore();
  const userId = useStoreUserEffect();
  const router = useRouter();
  const pageEntries = useQuery(api.aipen.getDocumentsByUserId, {
    userId: userId ?? ("31ab50dxjncgp7w6nkkvte2t9jdc4r0" as Id<"users">),
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
