// components/chat/PromptInput.tsx
"use client";

import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, userId: user?.id }),
    });

    const data = await res.json();

    if (res.ok && data.chatId) {
      router.push(`/c/${data.chatId}`); // ✅ navigate to /c/{chat_id}
    } else {
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-1 w-full flex bg-[#2a2a2a] text-white focus:outline-none rounded-2xl"
    >
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Make Your Backend Schema...."
        className="flex-1 p-3 rounded-lg focus:outline-none"
      />
      <button
        type="submit"
        className="ml-2 cursor-pointer px-4 py-2  rounded-md"
      >
        <Send />
      </button>
    </form>
  );
}
