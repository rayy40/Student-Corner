"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAction } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizSchema } from "@/schema/QuizSchmea";
import { LuCopyCheck, LuBookOpen, LuPuzzle, LuFileUp } from "react-icons/lu";
import { api } from "@/convex/_generated/api";

type FormData = z.infer<typeof quizSchema>;

export default function QuizGenerator() {
  const handleQuiz = useAction(api.quiz.handleQuiz);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      topic: "",
      questions: 3,
      type: "mcq",
    },
  });

  const values = getValues();

  const onSubmit = (data: FormData) => {
    //Call the api
    console.log(data);
    handleQuiz({ data });
    reset();
  };

  const Topic = () => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate" htmlFor="Topic">
          Topic
        </label>
        <input
          className="text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
          type="text"
          placeholder="Enter a topic"
          {...register("topic")}
        />
        {errors.topic && (
          <p className="text-xs text-sign-in">{errors?.topic?.message}</p>
        )}
      </div>
    );
  };

  const Paragraph = () => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate" htmlFor="Topic">
          Paragraph
        </label>
        <textarea
          rows={6}
          className="text-sm p-2 font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
          placeholder="Enter your paragraph"
          {...register("paragraph")}
        />
        {errors.paragraph && (
          <p className="text-xs text-sign-in">{errors?.paragraph?.message}</p>
        )}
      </div>
    );
  };

  const File = () => {
    return (
      <div className="p-2 w-full h-[150px] bg-input-background rounded-md shadow-[inset_0_0_6px_-2px_rgba(15,15,15,0.25)]">
        <div className="relative rounded-md border-2 bg-light-gray border-dotted border-dark-gray w-full h-full flex items-center justify-center shadow-[inset_0_0_6px_-2px_rgba(15,15,15,0.25)]">
          <label
            className="flex items-center justify-center w-full h-full rounded-md"
            htmlFor="file"
          >
            <div className="flex items-center gap-2 text-xs p-2 px-3 rounded-md bg-dark-gray">
              <LuFileUp /> Upload PDFs
            </div>
          </label>
          <input
            type="file"
            id="file"
            className="w-0 h-0 -z-10 absolute opacity-0"
            {...register("file")}
          />
          {/* {errors.file && (
            <p className="text-xs text-sign-in">{errors?.file?.message}</p>
          )} */}
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 w-full flex flex-col gap-4"
    >
      <Topic />
      {/* <Paragraph /> */}
      {/* <File /> */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate" htmlFor="Topic">
          Questions
        </label>
        <input
          className="text-sm p-2 h-[36px] font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
          type="number"
          placeholder="Enter no of questions"
          {...register("questions", { valueAsNumber: true })}
          onChange={(e) => setValue("questions", parseInt(e.target.value))}
        />
        {errors.questions && (
          <p className="text-xs text-sign-in">{errors?.questions?.message}</p>
        )}
      </div>
      <div className="mt-4 w-full flex flex-row items-center ">
        <div
          onClick={() => setValue("type", "mcq", { shouldValidate: true })}
          className={`${
            getValues("type") === "mcq"
              ? "bg-light-gray"
              : "bg-input-background"
          } text-xs p-2.5 w-1/2 rounded-l-md flex items-center justify-center cursor-pointer gap-2 shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)]`}
        >
          <LuCopyCheck />
          MCQ
        </div>
        <div
          onClick={() =>
            setValue("type", "hybrid_response", { shouldValidate: true })
          }
          className={`${
            getValues("type") === "hybrid_response"
              ? "bg-light-gray"
              : "bg-input-background"
          } text-xs p-2.5 w-1/2 flex items-center justify-center cursor-pointer gap-2 shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)]`}
        >
          <LuPuzzle />
          Hybrid Response
        </div>
        <div
          onClick={() =>
            setValue("type", "short_answer", { shouldValidate: true })
          }
          className={`${
            getValues("type") === "short_answer"
              ? "bg-light-gray"
              : "bg-input-background"
          } text-xs p-2.5 w-1/2 rounded-r-md flex items-center justify-center cursor-pointer gap-2 shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)]`}
        >
          <LuBookOpen />
          Short Answer
        </div>
      </div>
      <button
        className="mt-4 p-2.5 text-white w-full bg-slate rounded-md hover:bg-[#333]"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}