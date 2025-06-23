// components/chat/PromptInput.tsx
"use client";

import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export default function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const placeholders = [
    "Blog App Schema",
    "User Profile System",
    "E-commerce Platform",
    "Social Media App",
    "Task Management Tool",
  ]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
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
    setPrompt("");
    const data = await res.json();

    if (res.ok && data.chatId) {
      router.push(`/c/${data.chatId}`); // ✅ navigate to /c/{chat_id}
    } else {
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (

    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
