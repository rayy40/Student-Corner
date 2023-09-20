"use client";

import { useChatStore, useUserStore } from "@/context/store";
import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowUp } from "react-icons/fa6";
import Loading from "../Loading/Loading";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

type QueryForm = {
  text: string;
};

export default function QueryInput() {
  const { chatId, setAnswer } = useChatStore();
  const router = useRouter();
  const searchQuery = useAction(api.chatbot.searchQuery);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, setFocus } =
    useForm<QueryForm>();

  useEffect(() => {
    if (!chatId) {
      router.push("/chatbot");
    }
  }, [chatId, router]);

  const onSubmit = async (data: QueryForm) => {
    try {
      setAnswer("");
      if (chatId) {
        setIsLoading(true);
        const answer = await searchQuery({
          query: data.text,
          chatId: chatId,
        });
        reset();
        setAnswer(answer ?? "Could not find the answer.");
      } else {
        console.log("Chat ID missing");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative mx-auto pt-10 max-2-[600px]">
      <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
        <label htmlFor="AiInput"></label>
        <input
          autoFocus
          autoComplete="off"
          type="text"
          className="w-full text-md px-4 py-6 h-10 font-normal bg-input-background shadow-[0_0_6px_1px_rgba(0,0,0,0.15)] rounded-md focus:outline-[rgba(0,0,0,0.1)]"
          placeholder="Ask your questions..."
          {...register("text")}
        />
        <button
          className="rounded-full bg-dark-gray p-1 text-xs text-light-gray right-4 top-1/2 -translate-y-1/2 absolute"
          type="submit"
        >
          <FaArrowUp />
        </button>
      </form>
    </div>
  );
}
