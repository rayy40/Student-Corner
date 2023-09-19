import OpenAI from "openai";
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import {
  brainstormIdeas,
  creativeStoryPrompt,
  essayOrBlogPrompt,
  prosAndCons,
  todoList,
} from "../lib/helpers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getDocumentsByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("aipen")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return entry;
  },
});

export const createDocument = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("aipen", {
      userId: args.userId,
    });
    return id;
  },
});

export const generateContent = action({
  args: { documentId: v.id("aipen"), input: v.string() },
  handler: async (ctx, args) => {
    let prompt = "";
    if (args.input.includes("essay") || args.input.includes("blog")) {
      prompt = essayOrBlogPrompt(args.input);
    } else if (args.input.includes("creative story")) {
      prompt = creativeStoryPrompt(args.input);
    } else if (args.input.includes("pros and cons")) {
      prompt = prosAndCons(args.input);
    } else if (args.input.includes("todo list")) {
      prompt = todoList(args.input);
    } else if (args.input.includes("brainstorm")) {
      prompt = brainstormIdeas(args.input);
    }
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    await ctx.runMutation(api.aipen.patchContent, {
      documentId: args.documentId,
      content: response.choices[0].message.content ?? "",
    });
  },
});

export const patchContent = mutation({
  args: { documentId: v.id("aipen"), content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.documentId, {
      content: args.content,
    });
  },
});

export const getDocument = query({
  args: { documentId: v.id("aipen") },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("aipen")
      .filter((q) => q.eq(q.field("_id"), args.documentId))
      .collect();
    return entry;
  },
});
