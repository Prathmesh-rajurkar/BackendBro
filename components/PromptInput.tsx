// components/chat/PromptInput.tsx
"use client";

import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { MultiStepLoader } from "./ui/multi-step-loader";

export default function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const loadingStates = [
    {
      text: "Analyzing your request...",
    },
    {
      text: "Designing the database schema...",
    },
    {
      text: "Generating the backend code...",
    },
    {
      text: "Finalizing your blueprint...",
    },
    {
      text: "Ready to deploy your backend!",
    },
  ];
  const placeholders = [
    "Blog App Schema",
    "User Profile System",
    "E-commerce Platform",
    "Social Media App",
    "Task Management Tool",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPrompt(e.target.value);
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
    router.prefetch(`/c/${data.chatId}`); // ✅ prefetch the chat page
    if (res.ok && data.chatId) {
      router.push(`/c/${data.chatId}`); // ✅ navigate to /c/{chat_id}
    } else {
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
      <div>
        <MultiStepLoader loading={loading} loadingStates={loadingStates} />
      </div>
    </div>
  );
}
