import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const format = [
  {
    question: "Who is Luke Skywalker's father?",
    options: ["Obi-Wan Kenobi", "Emperor Palpatine", "Darth Vadar", "Yoda"],
    answer: "Darth Vadar",
  },
];

export const handleQuiz = action({
  args: {
    data: v.object({
      topic: v.optional(v.string()),
      paragraph: v.optional(v.string()),
      questions: v.number(),
      type: v.string(),
      file: v.optional(v.any()),
    }),
  },
  handler: async (ctx, args) => {
    let prompt = "";
    if (args.data.type === "mcq") {
      prompt = `Generate ${args.data.questions} ${
        args.data.type
      } type questions related to ${
        args.data.topic
      } with three incorrect options and only one correct option and format the response as JSON in the shape of ${JSON.stringify(
        format
      )}.`;
    }
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion);

    return "success";
  },
});
