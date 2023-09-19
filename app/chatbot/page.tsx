"use client";

import { getTextContent } from "@/lib/scrape";
import { useForm } from "react-hook-form";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Chatbot() {
  type URLForm = {
    url: string;
  };
  const createSource = useMutation(api.sources.add);
  const createEmbeddings = useAction(api.chatbot.fetchEmbeddings);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<URLForm>();

  const onSubmit = async (data: URLForm) => {
    const textInChunks = await getTextContent(data.url);
    const embedding = await createEmbeddings({
      name: textInChunks?.title!,
      texts: textInChunks?.chunks.map(({ text }) => text) ?? [],
    });
    console.log(embedding);
    console.log(textInChunks);
    // const id = await addSource({
    //   name: textInChunks?.title!,
    //   chunks: textInChunks?.chunks!,
    // });
    // console.log(id);
    return "";
  };

  return (
    <div className="max-w-[550px] px-6 mx-auto min-h-screen flex flex-col gap-10 items-start">
      <div className="w-full mt-24 flex gap flex-col justify-center items-center">
        <h2 className="text-xl font-medium">Chat with Link</h2>
        <p className="max-w-[400px] text-center font-light">
          Provide links of documentation of a language/library/framework to
          clear ask questions to help with your doubts.
        </p>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <input
              type="url"
              className="text-xs p-4 h-[40px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
              placeholder="Provide your link"
              {...register("url", { required: true })}
            />
            {errors.url && (
              <p className="-mt-3 text-xs text-sign-in">
                You need to provide a url.
              </p>
            )}
            <button className="p-2 bg-slate text-white rounded-md hover:opacity-80">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
