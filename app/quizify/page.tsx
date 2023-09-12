import QuizGenerator from "@/components/QuizGenerator/QuizGenerator";
import TypeDropDown from "@/components/TypeDropDown/TypeDropDown";

export default function Quizify() {
  return (
    <div className="max-w-[500px] mx-auto min-h-screen flex flex-col items-start justify-center">
      <h2 className="mt-20 text-xl">Quizify</h2>
      <div className="flex gap-2 items-center">
        Type: <TypeDropDown />
      </div>
      <div className="-mt-20 w-full flex-grow flex justify-center items-center">
        <QuizGenerator />
      </div>
    </div>
  );
}
