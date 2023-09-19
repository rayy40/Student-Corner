"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import AiInput from "../AiInput/AiInput";
import { useNotepadStore } from "@/context/store";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function Editor() {
  const { isContextLoading, documentId } = useNotepadStore();
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
  const document = useQuery(api.aipen.getDocument, {
    documentId:
      (documentId as Id<"aipen">) ?? "41jq8f7y6mgbhkka5y3h4gk99jhdjkg",
  });

  useEffect(() => {
    editor?.commands.setContent(document?.[0]?.content ?? "");
    //eslint-disable-next-line
  }, [document]);

  if (isContextLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full text-left">
      {editor?.isEmpty ? <AiInput /> : <EditorContent editor={editor} />}
    </div>
  );
}
