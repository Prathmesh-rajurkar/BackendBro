"use client";
import React from "react";
import PromptInput from "./PromptInput";
import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { ColourfulText } from "./ui/colourful-text";

function ChatWindow() {
  const { user } = useUser();
  return (
    <div className="h-full w-full bg-[#1a1a1a] text-white">
      <div
        style={{ fontFamily: "var(--font-belanosima)" }}
        className="text-6xl mt-8 text-center bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent"
      >
        backendbro
      </div>
      <div className="flex-1 flex flex-col mt-[10rem] justify-between items-center">
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Future: Chat bubbles + ER diagram output */}
        </div>
        <div className="flex flex-col mx-4 items-center justify-center ">
          <h1 className="text-center text-3xl mb-4 w-[60%] font-sans font-semibold text-pretty">
            Hey 
            <ColourfulText text={` ${user?.firstName}` || ' User'}/>
            , what backend blueprint are we drawing today?
          </h1>
          <PromptInput />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
