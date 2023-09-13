import { v } from "convex/values";
import {
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { internal, api } from "./_generated/api";
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

export const createQuiz = mutation({
  args: {
    userId: v.id("users"),
    data: v.object({
      topic: v.optional(v.string()),
      paragraph: v.optional(v.string()),
      questions: v.number(),
      type: v.string(),
      file: v.optional(v.any()),
    }),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.userId) {
      throw new Error("You need to login first.");
    }
    const id = await ctx.db.insert("quiz", {
      userId: args.userId,
      input: args.data,
      response: args.response ?? "",
    });
    ctx.scheduler.runAfter(0, internal.quiz.generateQuiz, {
      quizId: id,
      input: args.data,
      response: args.response ?? "",
    });
    return id;
  },
});

export const generateQuiz = internalAction({
  args: {
    quizId: v.id("quiz"),
    input: v.object({
      topic: v.optional(v.string()),
      paragraph: v.optional(v.string()),
      questions: v.number(),
      type: v.string(),
      file: v.optional(v.any()),
    }),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    let prompt = "";
    if (args.input.type === "mcq") {
      prompt = `Generate ${args.input.questions} ${
        args.input.type
      } type questions related to ${
        args.input.topic
      } with three incorrect options and only one correct option and format the response as JSON in the shape of ${JSON.stringify(
        format
      )}.`;
    }
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    const input = args.input;
    const response =
      completion.choices[0].message.content ??
      "Unable to generate a quiz for you at this time.";
    await ctx.runMutation(internal.quiz.insertResponse, {
      quizId: args.quizId,
      input,
      response,
    });
  },
});

export const insertResponse = internalMutation({
  args: {
    quizId: v.id("quiz"),
    input: v.object({
      topic: v.optional(v.string()),
      paragraph: v.optional(v.string()),
      questions: v.number(),
      type: v.string(),
      file: v.optional(v.any()),
    }),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.quizId, {
      response: args.response ?? "",
    });
  },
});

export const getCurrentQuiz = query({
  args: { quizId: v.id("quiz") },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("quiz")
      .filter((q) => q.eq(q.field("_id"), args.quizId))
      .collect();

    return entry;
  },
});
