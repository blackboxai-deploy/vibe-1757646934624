"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SystemPromptSettingsProps {
  systemPrompt: string;
  onSystemPromptChange: (prompt: string) => void;
  onClearConversation: () => void;
}

export function SystemPromptSettings({ 
  systemPrompt, 
  onSystemPromptChange, 
  onClearConversation 
}: SystemPromptSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempPrompt, setTempPrompt] = useState(systemPrompt);

  const handleSave = () => {
    onSystemPromptChange(tempPrompt);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempPrompt(systemPrompt);
    setIsOpen(false);
  };

  const resetToDefault = () => {
    const defaultPrompt = "You are a helpful AI assistant. Provide clear, accurate, and helpful responses to user questions.";
    setTempPrompt(defaultPrompt);
  };

  return (
    <Card className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">AI Settings</CardTitle>
                <CardDescription>
                  Customize the AI's behavior and manage your conversation
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  onClearConversation();
                }}>
                  Clear Chat
                </Button>
                <div className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  ⌄
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <Separator className="mb-4" />
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  System Prompt
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Define how the AI should behave and respond. This affects all messages in the conversation.
                </p>
                <Textarea
                  value={tempPrompt}
                  onChange={(e) => setTempPrompt(e.target.value)}
                  placeholder="Enter system prompt..."
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetToDefault}>
                    Reset to Default
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>

              {/* Quick Preset Prompts */}
              <div className="pt-2">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Presets:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8"
                    onClick={() => setTempPrompt("You are a helpful coding assistant. Provide clear, well-commented code examples and explain technical concepts in detail.")}
                  >
                    Coding Assistant
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8"
                    onClick={() => setTempPrompt("You are a creative writing assistant. Help with storytelling, character development, and provide imaginative ideas.")}
                  >
                    Creative Writer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8"
                    onClick={() => setTempPrompt("You are a research assistant. Provide factual, well-sourced information and help analyze complex topics.")}
                  >
                    Research Helper
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}