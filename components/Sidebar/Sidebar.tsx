"use client";

import { useNotepadStore, useUserStore } from "@/context/store";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { LuFile, LuFilePlus } from "react-icons/lu";

interface Page {
  content?: string | undefined;
  userId: Id<"users">;
  _id: Id<"aipen">;
}

export default function Sidebar() {
  const router = useRouter();
  const { userId } = useUserStore();
  const { setDocumentId } = useNotepadStore();
  const createDocument = useMutation(api.aipen.createDocument);

  const pageEntries = useQuery(api.aipen.getDocumentsByUserId, {
    userId: userId as Id<"users">,
  });

  const createNewPage = async () => {
    const documentId = await createDocument({
      userId: userId as Id<"users">,
    });
    setDocumentId(documentId);
    router.push(`/ai-pen/${documentId}`);
  };

  const List = ({ page }: { page: Page }) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(page.content as string, "text/html");

    // Find the <h1> element and get its text content
    const h1Element = doc.querySelector("h1");
    const h1Text = h1Element?.textContent;

    return (
      <li
        onClick={() => {
          router.push(`/ai-pen/${page?._id}`);
          setDocumentId(page?._id);
        }}
        className="capitalize whitespace-nowrap w-full flex items-center text-[rgba(25,23,17,0.6)] font-medium border-b border-b-light-gray gap-3 rounded-md text-xs p-3 px-4 hover:bg-hover-light-gray hover:text-dark-gray cursor-pointer overflow-hidden"
      >
        <div className="w-[20px]">
          <LuFile className="text-[20px]" />
        </div>
        <p className="overflow-hidden text-ellipsis">{h1Text ?? "Untitled"}</p>
      </li>
    );
  };
  return (
    <div className="w-[240px] p-1 pt-[4rem] overflow-y-auto">
      <div className="flex flex-col gap-10">
        <ul>
          <p className="border-b border-b-light-gray p-2 text-[0.775rem] font-medium text-dark-gray">
            Operations
          </p>
          <li
            onClick={createNewPage}
            className="capitalize whitespace-nowrap w-full flex items-center text-[rgba(25,23,17,0.6)] font-medium border-b border-b-light-gray gap-3 rounded-md text-xs p-3 px-4 hover:bg-hover-light-gray hover:text-dark-gray cursor-pointer overflow-hidden"
          >
            <div className="w-[20px]">
              <LuFilePlus className="text-[20px]" />
            </div>
            <p className="overflow-hidden text-ellipsis">Create a new page</p>
          </li>
        </ul>
        <ul>
          <p className="border-b border-b-light-gray p-2 text-[0.775rem] font-medium text-dark-gray">
            Your Pages
          </p>
          {pageEntries?.map((page, index) => (
            <List key={index} page={page} />
          ))}
        </ul>
      </div>
    </div>
  );
}
