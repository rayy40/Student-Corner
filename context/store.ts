import { create } from "zustand";
import { Id } from "@/convex/_generated/dataModel";

interface QuizState {
  quizId: Id<"quiz"> | null;
  setQuizId: (quizId: Id<"quiz">) => void;
}

interface UserState {
  userId: Id<"users"> | null;
  setUserId: (userId: Id<"users">) => void;
}

interface NotepadState {
  context: string;
  setContext: (context: string) => void;
  documentId: Id<"aipen"> | null;
  setDocumentId: (documentId: Id<"aipen">) => void;
  isContextLoading: boolean;
  setIsContextLoading: (isContextLoading: boolean) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

export const useQuizStore = create<QuizState>()((set) => ({
  quizId: null,
  setQuizId: (quizId) => set({ quizId }),
}));

export const useNotepadStore = create<NotepadState>()((set) => ({
  context: "",
  setContext: (context) => set({ context }),
  documentId: null,
  setDocumentId: (documentId) => set({ documentId }),
  isContextLoading: false,
  setIsContextLoading: (isContextLoading) => set({ isContextLoading }),
}));
