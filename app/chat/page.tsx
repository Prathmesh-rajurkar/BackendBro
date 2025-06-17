"use client";
import ChatWindow from "@/components/ChatWindow";
import Sidebar from "@/components/Sidebar";
import { SidebarOpen } from "lucide-react";
import React, { useState } from "react";

function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-[#1a1a1a] text-white w-screen h-screen flex items-center ">
      {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 z-50 hover:text-orange-500 px-2 py-1 rounded-md"
        >
          <SidebarOpen />
        </button>
      )}
      <ChatWindow />
    </div>
  );
}

export default ChatPage;
