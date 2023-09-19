"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import AiInput from "../AiInput/AiInput";
import { useNotepadStore } from "@/context/store";
import { useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { BubbleMenu } from "./BubbleMenu/BubbleMenu";
import Link from "@tiptap/extension-link";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

export default function Editor() {
  let containerRef = useRef(null);
  const debounce = require("lodash.debounce");
  const { isContextLoading, documentId } = useNotepadStore();
  const updateContent = useMutation(api.aipen.patchContent);
  const doc = useQuery(api.aipen.getDocument, {
    documentId:
      (documentId as Id<"aipen">) ?? "41fgg896th0vy3zymm4hqd9d9jhmkgg",
  });

  // onUpdate: debounce(({ editor }: { editor: any }) => {
  //   updateContent({
  //     documentId: document?.[0]?._id as Id<"aipen">,
  //     content: editor?.getHTML(),
  //   });
  // }, 2000),
  const editor = useEditor({
    extensions: [StarterKit, Text, TextStyle, Color, Link],
    parseOptions: {
      preserveWhitespace: "full",
    },
  });

  useEffect(() => {
    if (!editor) return;
    let { from, to } = editor.state.selection;
    editor?.commands.setContent(doc?.[0]?.content ?? "", false, {
      preserveWhitespace: "full",
    });
    editor.commands.setTextSelection({ from, to });
    //eslint-disable-next-line
  }, [doc]);

  if (isContextLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full text-left">
      {editor?.isEmpty ? (
        <AiInput />
      ) : (
        <>
          {editor && (
            <BubbleMenu
              editor={editor}
              containerRef={containerRef}
            ></BubbleMenu>
          )}
          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
}
