import React from "react";

interface Quiz {
  answer: string;
  options?: string[];
  question: string;
  yourAnswer?: string;
}

type Props = {
  q: Quiz;
  id: number;
  type: string;
  questionVisible: number;
  quiz: Quiz[];
  setQuiz: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

export default function Question({
  q,
  id,
  type,
  questionVisible,
  setQuiz,
  quiz,
}: Props) {
  const handleSelectedAnswer = (
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

  return (
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
      {type === "short_answer" && (
        <div
          className={`${
            id === questionVisible ? "flex" : "hidden"
          } flex w-full`}
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
          onClick={() => handleSelectedAnswer(id, option)}
        >
          <span className="text-xs font-light p-2 py-1 rounded-md border border-dark-gray">
            {String.fromCharCode(97 + optionIdx)}
          </span>
          <p>{option}</p>
        </div>
      ))}
    </>
  );
}
