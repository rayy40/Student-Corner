import OpenAI from "openai";
import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const MarkdownIt = require("markdown-it");
const mdOptions = {
  html: true,
  langPrefix: "highlight ",
  linkify: false,
  breaks: false,
};
const markdownIt = new MarkdownIt(mdOptions);

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
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professor of English. You are going to help me write essays, blogs, creative stories, pros and cons of a topic, todo list and brainstorm ideas on a topic.Use the topic below to generate the same. Keep your answer under 500 words. Format the response using markdown, with '# Title' for each page and the rest as necessary. Be accurate, helpful, concise, and clear. ",
        },
        { role: "user", content: args.input },
      ],
      model: "gpt-3.5-turbo",
    });
    const markdownToHTMl: string = markdownIt.render(
      response.choices[0].message.content
    );
    console.log(markdownToHTMl);

    await ctx.runMutation(api.aipen.patchContent, {
      documentId: args.documentId,
      content: markdownToHTMl,
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
      .take(1);
    return entry;
  },
});
