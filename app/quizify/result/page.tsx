"use client";
import Loading from "@/components/Loading/Loading";
import { useQuizStore } from "@/context/store";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";

interface Quiz {
  answer: string;
  options: string[];
  question: string;
  yourAnswer?: string;
}

export default function Result() {
  const { quizId } = useQuizStore();
  const updatedQuizEntry = useQuery(api.quiz.getCurrentQuiz, {
    quizId: "36zx76hst64t7evqdwe7whf69jfcqgg" as Id<"quiz">,
  });

  if (!updatedQuizEntry) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full p-6 flex flex-col gap-3 justify-center items-center">
      <div className="mt-14 w-full flex items-center justify-between">
        <h2 className="text-lg font-medium">Summary</h2>
        <button className="text-xs rounded-md p-2 px-4 bg-slate text-white">
          Back to Dashboard
        </button>
      </div>
      <div className="w-full border-t-light-gray border-t py-2">
        <table className="border-collapse w-full">
          <thead>
            <tr className="text-xs text-dark-gray">
              <td className="border-b-light-gray border-b p-2 w-[10%]">No.</td>
              <td className="border-b-light-gray border-b p-2 w-[60%]">
                Question with Answer
              </td>
              <td className="border-b-light-gray border-b p-2 w-[30%]">
                Your Answer
              </td>
            </tr>
          </thead>
          <tbody>
            {updatedQuizEntry?.[0]?.response?.map((q: Quiz, id: number) => (
              <tr className="text-slate text-sm" key={id}>
                <td className="text-dark-gray border-b-light-gray border-b p-3 px-2 w-[10%]">
                  {id + 1}
                </td>
                <td className="border-b-light-gray border-b p-3 px-2 w-[60%]">
                  <p className="font-light">{q.question}</p>
                  <p className="font-medium">{q.answer}</p>
                </td>
                <td className="border-b-light-gray border-b p-3 px-2 w-[30%] font-medium">
                  {q.yourAnswer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
