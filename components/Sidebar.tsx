"use client";
import { SidebarClose } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ChatEntry = {
  _id: string;
  title: string;
  prompt: string;
  response: string;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  chatLog: any; // or change to Chat[] if you're storing full chat objects
};

function Sidebar({ isOpen, onClose, chatLog }: SidebarProps) {
  const router = useRouter();

  const handleRedirect = (chatId: string) => {
    router.push(`/c/${chatId}`);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <aside className="w-64 bg-[#1a1a1a] h-full p-4 border-r border-gray-700 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="text-lg font-semibold text-white">Previous Chats</div>
          <button
            onClick={onClose}
            className="text-white hover:text-orange-500 text-xl transition-colors duration-200"
          >
            <SidebarClose />
          </button>
        </div>
        {chatLog && chatLog.length > 0 ? (
          chatLog.map((chat: ChatEntry) => (
            <div
              key={chat._id}
              onClick={() => handleRedirect(chat._id)}
              className="p-2 mt-2 rounded-md hover:bg-orange-700 cursor-pointer transition-colors duration-200 text-white"
            >
              {chat.title}
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-400">
            No previous chats. Keep building 🚀
          </div>
        )}
      </aside>
    </div>
  );
}
export default Sidebar;
