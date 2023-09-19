"use client";

import { useNotepadStore } from "@/context/store";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { LuFilePlus2 } from "react-icons/lu";

export default function Sidebar() {
  const router = useRouter();
  const userId = useStoreUserEffect();
  const { setDocumentId } = useNotepadStore();
  const createDocument = useMutation(api.aipen.createDocument);
  const pageEntries = useQuery(api.aipen.getDocumentsByUserId, {
    userId: userId ?? ("31ab50dxjncgp7w6nkkvte2t9jdc4r0" as Id<"users">),
  });

  const createNewPage = async () => {
    const documentId = await createDocument({
      userId: userId as Id<"users">,
    });
    setDocumentId(documentId);
    router.push(`/ai-pen/${documentId}`);
  };

  console.log(pageEntries);

  const List = () => {
    return (
      <li
        onClick={createNewPage}
        className="w-full flex items-center text-[rgba(25,23,17,0.6)] font-medium border-b border-b-light-gray gap-3 rounded-md text-xs p-3 px-4 hover:bg-hover-light-gray hover:text-dark-gray cursor-pointer"
      >
        <LuFilePlus2 />
        Create a page
      </li>
    );
  };
  return (
    <div className="w-[240px] p-1 pt-[4rem]">
      <div>
        <ul>
          <List />
          <List />
          <List />
        </ul>
      </div>
    </div>
  );
}
