import {
  mutation,
  internalQuery,
  action,
  internalMutation,
} from "./_generated/server.js";
import { api, internal } from "./_generated/api.js";
import { v } from "convex/values";
import OpenAI from "openai";
import { v4 as uuidV4 } from "uuid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export const generateUploadUrl = mutation(async (ctx) => {
//   return await ctx.storage.generateUploadUrl();
// });

// export const uploadFiles = mutation({
//   args: { storageId: v.string(), userId: v.id("users"), type: v.string() },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("chatbot", {
//       storageId: args.storageId,
//       userId: args.userId,
//       format: args.type,
//     });
//     const url = await ctx.storage.getUrl(args.storageId);
//     console.log(url);

//     // const loader = new PDFLoader(url as string);
//     // const docs = await loader.load();
//     // console.log(docs);
//   },
// });

export const fetchEmbedding = async (text: string[] | string) => {
  const result = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return result;
};

export const fetchEmbeddings = action({
  args: {
    title: v.string(),
    texts: v.array(v.string()),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const uniqueId = uuidV4();

    const result = await fetchEmbedding(
      args.texts.map((text) => text.replace(/\n/g, " "))
    );
    const allembeddings = result.data as {
      embedding: number[];
      index: number;
    }[];
    allembeddings.sort((a, b) => a.index - b.index);
    const embeddings = allembeddings.map(({ embedding }) => embedding);

    for (let i = 0; i < args.texts.length; i++) {
      await ctx.runMutation(internal.chatbot.addEmbeddings, {
        chatId: uniqueId,
        userId: args.userId,
        title: args.title,
        content: args.texts[i],
        embeddings: embeddings[i],
      });
    }
    return uniqueId;
  },
});

export const addEmbeddings = internalMutation({
  args: {
    chatId: v.string(),
    userId: v.id("users"),
    title: v.string(),
    content: v.string(),
    embeddings: v.array(v.number()),
  },
  handler: (ctx, args) => {
    ctx.db.insert("chatbot", {
      chatId: args.chatId,
      userId: args.userId,
      title: args.title,
      content: args.content,
      embedding: args.embeddings,
    });
  },
});

export const searchQuery = action({
  args: { query: v.string(), chatId: v.string() },
  handler: async (ctx, args) => {
    const response = await fetchEmbedding(args.query);
    const result = await ctx.vectorSearch("chatbot", "by_embedding", {
      vector: response.data?.[0]?.embedding,
      limit: 16,
      filter: (q) => q.eq("chatId", args.chatId),
    });

    const filteredResults = result.filter((r) => r._score >= 0.8);

    const answer = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that accurately answers queries from texts. Use the text provided to form your answer, but avoid copying word-for-word from the texts. Try to use your own words when possible. Keep your answer under 5 sentences. Be accurate, helpful, concise, and clear.",
        },
        {
          role: "user",
          content: `
          Use the following passages to provide an answer to the query: "${
            args.query
          }"

          ${filteredResults?.map((d: any) => d.content).join("\n\n")}
          `,
        },
      ],
      max_tokens: 150,
    });

    return answer?.choices?.[0]?.message?.content;
  },
});
