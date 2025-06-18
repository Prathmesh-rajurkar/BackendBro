// components/chat/PromptInput.tsx
'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

export default function PromptInput() {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    console.log('User prompt:', prompt);
    try {
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from server:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
      })
    } catch (error) {
      
    }
    setPrompt('');
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
        <Send/>
      </button>
    </form>
  );
}
