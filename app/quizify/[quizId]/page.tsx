"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import Question from "@/components/Question/Question";

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

  //   const handleShortAnswer = (questionIndex: number, shortAnswer: string) => {
  //     const updatedQuiz = [...quiz];
  //     updatedQuiz[questionIndex].yourAnswer = shortAnswer;
  //     setQuiz(updatedQuiz);
  //   };

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
        <Question
          key={id}
          id={id}
          q={q}
          questionVisible={questionVisible}
          quiz={quiz}
          setQuiz={setQuiz}
          type={quizEntries?.[0]?.input?.type}
        />
      ))}
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
