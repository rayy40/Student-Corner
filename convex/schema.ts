import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
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
    options: v.optional(v.any()),
  }),
});
