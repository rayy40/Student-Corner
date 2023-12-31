"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import AiInput from "../AiInput/AiInput";
import { useNotepadStore } from "@/context/store";
import { useEffect, useRef, useState, useTransition } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { TipTapEditorExtensions } from "./extensions";
import { TipTapEditorProps } from "./props";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { EditorBubbleMenu } from "./BubbleMenu/EditorBubbleMenu";
import Loading from "../Loading/Loading";

export default function Editor() {
  let containerRef = useRef(null);
  const router = useRouter();
  const { documentId } = useNotepadStore();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [hydrated, setHyrated] = useState(false);
  const updateContent = useMutation(api.aipen.patchContent);

  useEffect(() => {
    if (!documentId) {
      router.push("/ai-pen");
    }
  }, [documentId, router]);

  const document = useQuery(api.aipen.getDocument, {
    documentId: documentId as Id<"aipen">,
  });

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const html = editor.getHTML();
    updateContent({
      documentId: document?.[0]?._id as Id<"aipen">,
      content: html,
    });
    startTransition(() => {
      router.refresh();
    });
  }, 3000);

  const editor = useEditor({
    extensions: TipTapEditorExtensions,
    editorProps: TipTapEditorProps,
    onUpdate: (e) => {
      debouncedUpdates(e);
    },
    parseOptions: {
      preserveWhitespace: "full",
    },
    content: "",
  });

  useEffect(() => {
    if (editor && document) {
      let { from, to } = editor.state.selection;
      editor?.commands.setContent(document?.[0]?.content ?? "", false, {
        preserveWhitespace: "full",
      });
      editor.commands.setTextSelection({ from, to });
    }
    if (document) {
      setIsLoading(false);
    }
  }, [document, editor, hydrated]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-11rem)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full text-left">
      {editor?.isEmpty ? (
        <AiInput />
      ) : (
        <>
          {editor && <EditorBubbleMenu editor={editor} />}
          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
}
