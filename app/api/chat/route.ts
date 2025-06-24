import dbConnect from "@/lib/db";
import Chat from "@/models/Chat";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

const systemPrompt = `You are a backend architecture expert and DBML schema generator.

Your task is to convert user prompts describing application features into clean, industry-standard DBML code.

Follow these rules:

Output only valid and minimal DBML code — no explanations.

Use PascalCase for table names and snake_case for column names.

Use correct types (e.g., varchar, text, integer, timestamp, boolean, uuid, json).

Include references using Ref: lines for foreign keys.

Use Enum for clearly defined options like status or roles.

Add [note: "description"] to fields when appropriate.

Prefer singular table names if the concept is singular (e.g. User, Post), or plural if natural (e.g. Logs, Notifications).

Include primary keys using [primary key] or [pk] as needed.

Output must be DBML only. Do not include headings, descriptions, markdown, or code blocks.

Example of DBML output: 
Table users {
  id integer
  username varchar
  role varchar
  created_at timestamp
}

Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer
  status post_status
  created_at timestamp
}

Enum post_status {
  draft
  published
  private [note: 'visible via URL only']
}

Ref: posts.user_id > users.id // many-to-one`;

const summarizeSystemPrompt = `You are a summarization assistant.

Your job is to generate a short, single-line title summarizing a user's database idea. Return **only one concise title**, 3–6 words, with no line breaks, no extra spaces, and no special characters. Do not list multiple items.


Examples:
Prompt: "An app for blogs with users, posts, and comments"
→ Title: Blog App Schema

Prompt: "User profile system with followers and bio"
→ Title: User Profile System

Dont forget to keep space between two words `


export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { prompt, userId } = await request.json();
    if (!prompt || !userId) {
      return new Response("Prompt and userId are required", { status: 400 });
    }
    const summaryRes = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [
        {
          role: "system",
          content: summarizeSystemPrompt
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    const title =
      summaryRes.choices?.[0]?.message?.content?.trim() || "Untitled Chat";
      console.log(summaryRes);
      
    const res = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (!res.choices || res.choices.length === 0) {
      return new Response("No response from AI", { status: 500 });
    }

    // saving response in the Chat Model
    const chatData = {
      userId: userId,
      prompt: prompt,
      title: title,
      response: res.choices[0].message.content,
      createdAt: new Date(),
    };
    const chat = await Chat.create(chatData);

    console.log(res.choices[0].message.content);
    return NextResponse.json({
      message: "DBML generated successfully",
      chatId: chat._id,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
