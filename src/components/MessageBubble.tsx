"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} group`}>
      <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-3 ${isUser ? "space-x-reverse" : ""}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          isUser 
            ? "bg-blue-500 text-white" 
            : "bg-gray-600 dark:bg-gray-300 text-white dark:text-gray-800"
        }`}>
          {isUser ? "U" : "AI"}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
          {/* Message Bubble */}
          <div className={`relative px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
          }`}>
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
            
            {/* Copy button - only visible on hover for assistant messages */}
            {!isUser && (
              <Button
                variant="ghost"
                size="sm"
                className={`absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 px-2 text-xs ${
                  copied ? "text-green-600" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={copyToClipboard}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>

          {/* Timestamp */}
          <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 px-1 ${
            isUser ? "text-right" : "text-left"
          }`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}