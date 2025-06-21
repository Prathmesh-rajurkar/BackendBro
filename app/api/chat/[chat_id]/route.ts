// app/api/chat/[chat_id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // your MongoDB connection
import Chat from "@/models/Chat"; // your Mongoose model
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { chat_id: string } }
) {
  try {
    await dbConnect();
    const { chat_id } = await params;
    if (!mongoose.Types.ObjectId.isValid(chat_id)) {
      return NextResponse.json({ error: "Invalid chat ID" }, { status: 400 });
    }
    const chatId = new mongoose.Types.ObjectId(chat_id);
    const chat = await Chat.findById(chatId);
    console.log(chat);
    
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    console.error("Error fetching chat:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
