import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  chatbot: defineTable({
    storageId: v.string(),
    userId: v.id("users"),
    format: v.string(),
  }),
  aipen: defineTable({
    userId: v.id("users"),
    input: v.optional(v.string()),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    lastOpenedOn: v.optional(v.string()),
  }),
  sources: defineTable({
    name: v.string(),
    chunkIds: v.array(v.id("chunks")),
    saved: v.boolean(),
  }),
  chunks: defineTable({
    text: v.string(),
    sourceId: v.id("sources"),
    chunkIndex: v.number(),
    lines: v.object({ from: v.number(), to: v.number() }),
  }),
  quiz: defineTable({
    userId: v.id("users"),
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
    score: v.optional(v.number()),
    options: v.optional(v.any()),
  }),
});
