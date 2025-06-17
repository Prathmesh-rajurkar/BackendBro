"use client";
import { SidebarClose } from "lucide-react";
import React, { useState } from "react";

function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="position-fixed top-0 left-0 w-fit flex flex-col  text-white border-0">
      <aside className="w-64 bg-[#1a1a1a] h-screen p-4 border-r border-gray-700 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="text-lg font-semibold">Previous Chats</div>
          <button
            onClick={onClose}
            className="text-white hover:text-orange-500 text-xl"
          >
            <SidebarClose/>
          </button>
        </div>
        {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
          <div
            key={index}
            className="p-2 mt-2 rounded-md hover:bg-orange-700 cursor-pointer transition-colors"
          >
            {chat}
          </div>
        ))}
      </aside>
    </div>
  );
}

export default Sidebar;
