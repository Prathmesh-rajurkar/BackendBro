"use client";
import { SidebarClose } from "lucide-react";
import React, { useState } from "react";

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div 
      className={`fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
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
        {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
          <div
            key={index}
            className="p-2 mt-2 rounded-md hover:bg-orange-700 cursor-pointer transition-colors duration-200 text-white"
          >
            {chat}
          </div>
        ))}
      </aside>
    </div>
  );
}
export default Sidebar;