"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { dbmlToReactFlow } from "@/lib/dbmlToReactFlow";
import { ReactFlowProvider } from "reactflow";
import Diagram from "@/components/Diagram";
import { CodeBlock } from "@/components/ui/code-block";
import type { Edge, Node } from "reactflow";

function ChatResponse() {
  const params = useParams();
  const chat_id = params?.chat_id as string;
  const [chatData, setChatData] = useState<any>(null);
  const [flowData, setFlowData] = useState<{ nodes: Node[]; edges: Edge[] }>({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    if (!chat_id) return;

    const fetchChat = async () => {
      try {
        const res = await fetch(`/api/chat/${chat_id}`);
        const data = await res.json();
        setChatData(data);
        const parsed = dbmlToReactFlow(data.response);
        setFlowData({
          nodes: parsed.nodes as Node[],
          edges: parsed.edges as Edge[],
        });
      } catch (err) {
        console.error("Failed to fetch chat response", err);
      }
    };

    fetchChat();
  }, [chat_id]);

  if (!chatData) {
    return <div className="text-white p-4">Loading chat response...</div>;
  }

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
          <h1 className="text-center font-serif font-semibold text-4xl text-white">
            {chatData?.title || "Untitled Chat"}
          </h1>
        </div>
        <div className="w-full h-full p-4 bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
          <CodeBlock
            language="sql"
            highlightLines={[]}
            filename="dbml"
            code={chatData.response || "No response available"}
          />
        </div>
        <div className="w-full h-full p-4 bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
          <ReactFlowProvider>
            <Diagram nodes={flowData.nodes} edges={flowData.edges} />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

export default ChatResponse;
