import React from "react";
import { CodeBlock } from "./ui/code-block";

function ChatResponse({chat} : {chat: any}) {
  const code = chat?.response || "No response available";
  return (
    <div className="flex flex-col justify-between items-center w-full h-full bg-[#1a1a1a] text-white p-4 overflow-y-auto">
      <div
        style={{ fontFamily: "var(--font-belanosima)" }}
        className="text-6xl  text-center bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent"
      >
        backendbro
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
        <div>
          <h1 className="text-center font-serif font-semibold text-4xl text-white">{chat?.title}</h1>
        </div>
        <div className="w-full h-full p-4 bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
          <CodeBlock
          language="sql"
          highlightLines={[9, 13, 14, 18]}
          filename="dbml"
          code={code}/>
        </div>
      </div>
    </div>
  );
}

export default ChatResponse;
