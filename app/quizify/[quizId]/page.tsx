"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import { useState } from "react";

export default function Quiz(props: { params: { quizId: Id<"quiz"> } }) {
  interface Quiz {
    answer: string;
    options: string[];
    question: string;
  }
  const [questionVisible, setQuestionVisible] = useState(0);

  const quizEntries = useQuery(api.quiz.getCurrentQuiz, {
    quizId: props.params.quizId,
  });

  const input = quizEntries?.[0]?.input;
  const quiz = quizEntries && JSON.parse(quizEntries?.[0]?.response);

  const updateQuestion = (operation: string) => {
    if (operation === "increment" && questionVisible < quiz.length - 1) {
      setQuestionVisible((prev) => prev + 1);
    }
    if (operation === "decrement" && questionVisible > 0) {
      setQuestionVisible((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto h-screen max-w-[550px] flex flex-col gap-2 items-center justify-center">
      <div className="w-full flex justify-between items-center py-3 text-xs">
        <p className="text-dark-gray">
          Topic:
          <span className="text-slate px-2">{input?.topic}</span>
        </p>
        <div className="text-xs text-dark-gray flex items-end gap-2">
          <p>Time left: </p>
          <p className="text-slate text-xs">29:30</p>
        </div>
      </div>
      {quiz?.map((q: Quiz, id: number) => (
        <>
          <div
            key={id}
            className={`${
              id === questionVisible ? "flex" : "hidden"
            } w-full bg-[rgb(201,203,202)] shadow-[0px_3px_6px_-2px_rgb(0,0,0,0.15),0px_-3px_6px_-2px_rgb(0,0,0,0.15),3px_0px_6px_-2px_rgb(0,0,0,0.15),-3px_0px_6px_-2px_rgb(0,0,0,0.15)] p-4 rounded-md gap-6 items-center overflow-hidden`}
          >
            <span className="font-light text-xs">{id + 1}.</span>
            <p>{q.question}</p>
          </div>
          {q.options.map((option) => (
            <div
              key={id}
              className={`${
                id === questionVisible ? "flex" : "hidden"
              } shadow-[inset_0_0_6px_-2px_rgba(0,0,0,0.35)] w-full p-4 py-3 rounded-md gap-3 items-center cursor-pointer hover:bg-light-gray`}
            >
              <span className="text-xs font-light p-2 py-1 rounded-md border border-dark-gray">
                a
              </span>
              <p>{option}</p>
            </div>
          ))}
        </>
      ))}
      <div className="text-xs mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => updateQuestion("decrement")}
          className={`${
            questionVisible === 0
              ? "opacity-20 cursor-not-allowed"
              : "opacity-100 hover:opacity-80 cursor-pointer"
          } px-3 py-2 pr-5 bg-slate text-white flex items-center gap-1 rounded-md`}
        >
          <FaCaretLeft />
          Prev
        </button>
        <button
          onClick={() => updateQuestion("increment")}
          className={`${
            questionVisible === quiz.length - 1
              ? "opacity-20 cursor-not-allowed"
              : "opacity-100 hover:opacity-80 cursor-pointer"
          } px-3 py-2 pl-5 bg-slate text-white flex items-center gap-1 rounded-md`}
        >
          Next
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
}
