"use client";

import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import React from "react";
import { useQuizStore } from "@/context/store";

export default function QuizDashboard() {
  const userId = useStoreUserEffect();
  const { setQuizId } = useQuizStore();

  const quizHistory = useQuery(api.quiz.getQuizHistory, {
    userId: "31ab50dxjncgp7w6nkkvte2t9jdc4r0" as Id<"users">,
  });

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    return formattedDate;
  };

  return (
    <div className="p-6 mt-14 w-full flex flex-col gap-4">
      <h2 className="text-lg font-medium">History</h2>
      <div className="border-t-light-gray border-t">
        <table className="border-collapse w-full">
          <thead className="text-xs text-dark-gray">
            <tr className="border-b border-b-light-gray gap-2 w-full">
              <td className="p-2 pl-0 w-[5%]">No.</td>
              <td className="p-2 mx-2 w-[50%]">Topic</td>
              <td className="p-2 mx-2 w-[15%]">Type</td>
              <td className="p-2 mx-2 w-[20%]">Date</td>
              <td className="p-2 mx-2 w-[10%]">Score</td>
            </tr>
          </thead>
          <tbody>
            {quizHistory?.map((q, id: number) => (
              <tr key={id} className="border-b-light-gray border-b capitalize">
                <td className="text-xs p-2 py-3 pl-0 w-[5%] text-dark-gray">
                  {id + 1}
                </td>
                <td className="text-sm p-2 py-3 mx-2 w-[50%] hover:underline">
                  <Link
                    onClick={() => setQuizId(q._id)}
                    href={`/quizify/result`}
                  >
                    {q.input.topic}
                  </Link>
                </td>
                <td className="text-xs p-2 py-3 mx-2 2-[15%] uppercase">
                  {q.input.type}
                </td>
                <td className="text-xs p-2 py-3 mx-2 w-[20%]">
                  {getDate(q._creationTime)}
                </td>
                <td className="text-xs p-2 py-3 mx-2 w-[10%]">5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
