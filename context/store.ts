import { create } from "zustand";
import { Id } from "@/convex/_generated/dataModel";

interface QuizState {
  type: string;
  setType: (type: string) => void;
  quizId: Id<"quiz"> | null;
  setQuizId: (quizId: Id<"quiz">) => void;
}

interface UserState {
  userId: Id<"users"> | null;
  setUserId: (userId: Id<"users">) => void;
}

interface ChatbotState {
  chatId: string | null;
  setChatId: (chatId: string) => void;
  answer: string;
  setAnswer: (answer: string) => void;
}

interface NotepadState {
  context: string;
  setContext: (context: string) => void;
  documentId: Id<"aipen"> | null;
  setDocumentId: (documentId: Id<"aipen">) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

export const useChatStore = create<ChatbotState>()((set) => ({
  answer: "",
  setAnswer: (answer) => set({ answer }),
  chatId: null,
  setChatId: (chatId) => set({ chatId }),
}));

export const useQuizStore = create<QuizState>()((set) => ({
  type: "By Topic",
  setType: (type) => set({ type }),
  quizId: null,
  setQuizId: (quizId) => set({ quizId }),
}));

export const useNotepadStore = create<NotepadState>()((set) => ({
  context: "",
  setContext: (context) => set({ context }),
  documentId: null,
  setDocumentId: (documentId) => set({ documentId }),
}));
