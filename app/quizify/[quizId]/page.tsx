"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

interface Quiz {
  answer: string;
  options?: string[];
  question: string;
  yourAnswer?: string;
}

export default function Quiz(props: { params: { quizId: Id<"quiz"> } }) {
  const router = useRouter();
  const submitOptions = useMutation(api.quiz.updateCurrentQuiz);

  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [questionVisible, setQuestionVisible] = useState(0);

  const quizEntries = useQuery(api.quiz.getCurrentQuiz, {
    quizId: props.params.quizId,
  });

  const updateQuestion = (operation: string) => {
    if (operation === "increment" && questionVisible < quiz?.length - 1) {
      setQuestionVisible((prev) => prev + 1);
    }
    if (operation === "decrement" && questionVisible > 0) {
      setQuestionVisible((prev) => prev - 1);
    }
  };

  const handleSelectedAnsswer = (
    questionIndex: number,
    selectedOption: string
  ) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[questionIndex].yourAnswer = selectedOption;
    setQuiz(updatedQuiz);
  };

  const handleShortAnswer = (questionIndex: number, shortAnswer: string) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[questionIndex].yourAnswer = shortAnswer;
    setQuiz(updatedQuiz);
  };

  const handleSubmit = () => {
    const transformedQuiz = quiz.map((question) => ({
      ...question,
      yourAnswer: question.yourAnswer || "", // Ensure yourAnswer is a string
    }));
    submitOptions({
      response: transformedQuiz,
      quizId: props.params.quizId,
    });
    router.push("/quizify/result");
  };

  useEffect(() => {
    if (quizEntries?.[0]?.response) {
      setQuiz(quizEntries?.[0]?.response);
    }
  }, [quizEntries]);

  if (!quizEntries?.[0]?.response || quiz.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const input = quizEntries?.[0]?.input;

  const Question = () => {
    return quiz?.map((q: Quiz, id: number) => (
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
        {quizEntries?.[0]?.input?.type === "short_answer" && (
          <div
            className={`${id === questionVisible ? "flex" : "hidden"} w-full`}
          >
            <textarea
              rows={5}
              value={q.yourAnswer ?? ""}
              className="w-full text-sm p-2 font-normal bg-input-background shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] rounded-md"
              placeholder="Enter your answer"
              onChange={(e) => handleShortAnswer(id, e.target.value)}
            />
          </div>
        )}
        {q?.options?.map((option, optionIdx) => (
          <div
            key={optionIdx}
            className={`${id === questionVisible ? "flex" : "hidden"} ${
              q.yourAnswer === option
                ? "bg-light-gray"
                : "bg-white hover:bg-[rgba(0,0,0,0.05)]"
            } border border-light-gray w-full p-4 py-3 rounded-md gap-3 items-center cursor-pointer`}
            onClick={() => handleSelectedAnsswer(id, option)}
          >
            <span className="text-xs font-light p-2 py-1 rounded-md border border-dark-gray">
              {String.fromCharCode(97 + optionIdx)}
            </span>
            <p>{option}</p>
          </div>
        ))}
      </>
    ));
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
      <Question />
      <div className="w-full text-xs mt-4 flex items-center justify-center gap-4">
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
            questionVisible === quiz?.length - 1
              ? "opacity-20 cursor-not-allowed"
              : "opacity-100 hover:opacity-80 cursor-pointer"
          } px-3 py-2 pl-5 bg-slate text-white flex items-center gap-1 rounded-md`}
        >
          Next
          <FaCaretRight />
        </button>
        <button
          onClick={handleSubmit}
          className="ml-auto px-5 py-2 bg-slate text-white items-center gap-1 rounded-md hover:opacity-80"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
