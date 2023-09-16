import { v } from "convex/values";
import {
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";
import OpenAI from "openai";
import {
  MCQformat,
  PreProcessText,
  ShortAnswerformat,
  TrueFalseformat,
} from "../lib/utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    response: v.array(
      v.object({
        question: v.string(),
        answer: v.string(),
        yourAnswer: v.optional(v.string()),
        options: v.optional(v.array(v.string())),
      })
    ),
  },
  handler: async (ctx, args) => {
    if (!args.userId) {
      throw new Error("You need to login first.");
    }
    const id = await ctx.db.insert("quiz", {
      userId: args.userId,
      input: args.data,
      response: args.response ?? [],
    });
    ctx.scheduler.runAfter(0, internal.quiz.generateQuiz, {
      quizId: id,
      input: args.data,
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
  },
  handler: async (ctx, args) => {
    let prompt = "";
    if (args.input.type === "mcq" && args.input.topic) {
      prompt = `Generate ${args.input.questions} ${
        args.input.type
      } type questions related to ${
        args.input.topic
      } with three incorrect options and only one correct option and format the response as JSON in the shape of ${JSON.stringify(
        MCQformat
      )}.`;
    }
    if (args.input.type === "mcq" && args.input.paragraph) {
      prompt = `You are a quiz generator. Your work is to generate ${
        args.input.questions
      } ${args.input.type} type questions related to the below text

      Text:
      '''
      ${args.input.paragraph}
      '''     
        There should be three incorrect options and only one correct option and format the response as JSON in the shape of ${JSON.stringify(
          MCQformat
        )}.`;
    }
    if (args.input.type === "short_answer" && args.input.topic) {
      prompt = `Generate ${args.input.questions} ${
        args.input.type
      } type questions related to ${
        args.input.topic
      } with answers being maximum around 18-25 words and format the response as JSON in the shape of ${JSON.stringify(
        ShortAnswerformat
      )}.`;
    }
    if (args.input.type === "short_answer" && args.input.paragraph) {
      prompt = `You are a quiz generator. Your work is to generate ${
        args.input.questions
      } ${args.input.type} type questions related to the below text

      Text:
      ------
      ${PreProcessText(args.input.paragraph)}
      ------    
        Answers should be maximum of 18-25 words and format the response as JSON in the shape of ${JSON.stringify(
          MCQformat
        )}.`;
    }
    if (args.input.type === "true_false") {
      prompt = `Generate ${args.input.questions} ${
        args.input.type
      } type questions related to ${
        args.input.topic
      } format the response as JSON in the shape of ${JSON.stringify(
        TrueFalseformat
      )}.`;
    }
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    const input = args.input;
    const response = completion.choices[0].message.content
      ? JSON.parse(completion.choices[0].message.content)
      : "Unable to generate a quiz for you at this time.";

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
    response: v.array(
      v.object({
        question: v.string(),
        answer: v.string(),
        yourAnswer: v.optional(v.string()),
        options: v.optional(v.array(v.string())),
      })
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.quizId, {
      response: args.response ?? [],
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

export const updateCurrentQuiz = mutation({
  args: {
    score: v.optional(v.number()),
    quizId: v.id("quiz"),
    response: v.array(
      v.object({
        question: v.string(),
        answer: v.string(),
        yourAnswer: v.string(),
        options: v.optional(v.array(v.string())),
      })
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.quizId, {
      score: args.score,
      response: args.response,
    });
  },
});

export const getQuizHistory = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("quiz")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return entry;
  },
});
