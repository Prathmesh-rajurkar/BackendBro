"use client";
import ChatResponse from "@/components/ChatResponse";
import ChatWindow from "@/components/ChatWindow";
import Sidebar from "@/components/Sidebar";
import { SidebarOpen } from "lucide-react";
import React, { use, useEffect, useState } from "react";

function ChatPage({ params }: { params: any }) {
  const { chat_id } = use(params) as { chat_id: string };
  const [chatData, setChatData] = useState(null);
  const [chatLog, setChatLog] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await fetch(`/api/chat/${chat_id}`);
        const data = await res.json();
        setChatData(data);
      } catch (error) {
        console.error("Error fetching chat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChat(); // Call the inner async function
  }, [chat_id]);

  useEffect(() => {
    const fetchChatLog = async () => {
      try {
        const res = await fetch(`/api/chat_log/`);
        const data = await res.json();
        setChatLog(data);
      } catch (error) {
        console.error("Error fetching chat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatLog(); // Call the inner async function
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="bg-[#1a1a1a] text-white w-screen h-screen flex relative overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} chatLog = {chatLog} />

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
        <ChatResponse chat = {chatData}/>
      </div>
    </div>
  );
}

export default ChatPage;
