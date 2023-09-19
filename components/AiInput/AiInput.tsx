"use client";

import { useNotepadStore } from "@/context/store";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useOutsideClick from "@/hooks/useOutsideClick";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { useAction, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowUp } from "react-icons/fa6";

type AIForm = {
  text: string;
};

export default function AiInput() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const userId = useStoreUserEffect();
  const createDocument = useMutation(api.aipen.createDocument);
  const generateContent = useAction(api.aipen.generateContent);
  const { documentId, setDocumentId } = useNotepadStore();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { register, handleSubmit, reset, setValue, setFocus } =
    useForm<AIForm>();

  useOutsideClick(ref, () => {
    setIsDropDownOpen(false);
  });

  const onSubmit = async (data: AIForm) => {
    let docId;
    if (!documentId) {
      docId = await createDocument({
        userId: userId as Id<"users">,
      });
    } else {
      docId = documentId;
    }
    await generateContent({
      documentId: docId,
      input: data.text,
    });
    setDocumentId(docId);
    reset();
    router.push(`/ai-pen/${docId}`);
  };

  const prompts = [
    "Write an essay about...",
    "Write a creative story about...",
    "Write a press release about...",
    "Write a blog post about...",
    "Write a job description about...",
    "Write a pros and cons list about...",
    "Write a todo list about...",
    "Brainstorm ideas on ",
  ];

  const List = ({ prompt }: { prompt: string }) => {
    return (
      <li
        onClick={() => {
          setValue("text", prompt.slice(0, -3) + " "),
            setFocus("text"),
            setIsDropDownOpen(false);
        }}
        className="p-2 border-b text-[rgba(25,23,17,0.6)] border-b-light-gray last:border-none hover:bg-light-gray hover:text-dark-gray rounded-md cursor-pointer"
      >
        {prompt}
      </li>
    );
  };
  return (
    <div className="relative mx-auto pt-10 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
        <label htmlFor="AiInput"></label>
        <input
          autoFocus
          autoComplete="off"
          type="text"
          className="w-full text-md px-4 py-6 h-10 font-normal bg-input-background shadow-[0_0_6px_1px_rgba(0,0,0,0.15)] rounded-md focus:outline-[rgba(0,0,0,0.1)]"
          placeholder="Ask AI to write anything..."
          onClick={() => setIsDropDownOpen(true)}
          {...register("text")}
        />
        <button
          className="rounded-full bg-dark-gray p-1 text-xs text-light-gray right-4 top-1/2 -translate-y-1/2 absolute"
          type="submit"
        >
          <FaArrowUp />
        </button>
      </form>
      {isDropDownOpen && (
        <div
          ref={ref}
          className="absolute mt-2 w-full top-100 left-0 shadow-[0_0_6px_1px_rgba(0,0,0,0.15)] bg-input-background rounded-md"
        >
          <ul className="bg-input-background py-2 px-2 text-xs">
            {prompts.map((prompt, index) => (
              <List key={index} prompt={prompt} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
