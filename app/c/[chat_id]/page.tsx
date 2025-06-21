"use client";
import ChatWindow from "@/components/ChatWindow";
import Sidebar from "@/components/Sidebar";
import { dbConnect } from "@/lib/db";
import Chat from "@/models/Chat";
import { SidebarOpen } from "lucide-react";
import React, { useState } from "react";

async function ChatPage({ params }: { params: { chat_id: string }}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  await dbConnect();
  const {chat_id} = await params;
  //   const chat = await Chat.findById(params.chat_id);


  return (
    <div className="bg-[#1a1a1a] text-white w-screen h-screen flex relative overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-50 hover:text-orange-500 px-2 py-1 rounded-md transition-colors duration-200"
          >
            <SidebarOpen />
          </button>
        )}
        <ChatWindow />
      </div>
    </div>
  );
}

export default ChatPage;
