import { create } from "zustand";
import { Id } from "@/convex/_generated/dataModel";

type SelectedAnswersType = {
  [key: string]: string;
};

interface QuizEntriesType {
  _id: Id<"quiz">;
  _creationTime: number;
  userId: Id<"users">;
  input: {
    topic?: string | undefined;
    paragraph?: string | undefined;
    file?: any;
    type: string;
    questions: number;
  };
  response: string;
}
[];

interface QuizState {
  quizId: Id<"quiz"> | null;
  setQuizId: (quizId: Id<"quiz">) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  quizId: null,
  setQuizId: (quizId) => set({ quizId }),
}));
