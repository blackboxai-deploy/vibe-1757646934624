"use client";

import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  ChatGPT AI Assistant
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Powered by Claude Sonnet 4
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
          <ChatInterface />
        </div>
      </div>
    </main>
  );
}