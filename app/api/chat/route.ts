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

export async function GET(request: NextRequest) {
  try {
    // const { prompt, userId } = await request.json();

    const res = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: 'Blog Application',
        },
      ],
    });

    console.log(res.choices[0].message.content);
    return NextResponse.json({ message: "DBML generated successfully" });
    
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
