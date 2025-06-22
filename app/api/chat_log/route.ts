import dbConnect from "@/lib/db";
import Chat from "@/models/Chat";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await dbConnect();
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = user.id;
        const chats = await Chat.find({userId}).sort({ createdAt: -1 }).limit(10);
        return NextResponse.json(chats, { status: 200 });
    } catch (error) {
        console.error("Error fetching chat log:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}