"use client";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useQuizStore } from "@/context/store";
import Loading from "@/components/Loading/Loading";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Quiz {
  answer: string;
  options?: string[];
  question: string;
  yourAnswer?: string;
}

export default function Result() {
  const { quizId } = useQuizStore();
  const router = useRouter();

  useEffect(() => {
    if (!quizId) {
      router.push("/quizify");
    }
  }, [quizId, router]);

  const updatedQuizEntry = useQuery(api.quiz.getCurrentQuiz, {
    quizId: quizId ?? ("36hrf57rp90rx37y0y7v12a39jfxe70" as Id<"quiz">),
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
        <Link
          href={"/dashboard/quiz"}
          className="text-xs rounded-md p-2 px-4 bg-slate text-white hover:opacity-80"
        >
          History
        </Link>
      </div>
      <div className="w-full border-t-light-gray border-t py-2">
        <table className="border-collapse w-full">
          <thead>
            <tr className="text-xs text-dark-gray">
              <td className="border-b-light-gray border-b p-2 w-[5%]">No.</td>
              <td className="border-b-light-gray border-b p-2 mx-4 w-[50%]">
                Question with Answer
              </td>
              <td className="border-b-light-gray border-b p-2 mx-4 w-[40%]">
                Your Answer
              </td>
            </tr>
          </thead>
          <tbody>
            {updatedQuizEntry?.[0]?.response?.map((q: Quiz, id: number) => (
              <tr className="text-slate text-sm" key={id}>
                <td className="text-dark-gray border-b-light-gray border-b p-3 px-2 w-[5%]">
                  {id + 1}
                </td>
                <td className="border-b-light-gray border-b p-3 px-2 pr-12 w-[50%]">
                  <p className="font-light">{q.question}</p>
                  <p className="font-medium">{q.answer}</p>
                </td>
                <td className="border-b-light-gray border-b p-3 px-2 w-[40%] font-medium">
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
