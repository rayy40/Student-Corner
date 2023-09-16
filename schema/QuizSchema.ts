import { z } from "zod";

const validatePdf = (file: HTMLInputElement | null) => {
  console.log(file?.files);
  if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please upload a PDF.");
  }
};

export const quizSchema = z.object({
  topic: z
    .string()
    .min(3, { message: "Topic must be at least 3 characters long." })
    .max(80)
    .optional(),
  paragraph: z
    .string()
    .min(3, { message: "Paragraph must be at least 3 characters long." })
    .max(5000, { message: "Text cannot be more than 5000 characters." })
    .optional(),
  file: z
    .custom((file) => {
      validatePdf(file as HTMLInputElement);
      return file;
    })
    .optional(),
  type: z.enum(["mcq", "true_false", "short_answer"]),
  questions: z
    .number()
    .min(1)
    .max(10, { message: "Cannot generate more than 10 questions." }),
});
