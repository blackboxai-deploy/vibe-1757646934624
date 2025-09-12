import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json();

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Prepare messages for API
    const apiMessages = [];
    
    // Add system prompt if provided
    if (systemPrompt && systemPrompt.trim()) {
      apiMessages.push({
        role: "system",
        content: systemPrompt.trim()
      });
    }

    // Add conversation messages
    apiMessages.push(...messages);

    // Make request to custom AI endpoint
    const response = await fetch("https://oi-server.onrender.com/chat/completions", {
      method: "POST",
      headers: {
        "customerId": "vishaldh31@gmail.com",
        "Content-Type": "application/json",
        "Authorization": "Bearer xxx"
      },
      body: JSON.stringify({
        model: "openrouter/claude-sonnet-4",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API Error:", response.status, errorText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Extract the assistant's response
    const assistantMessage = data.choices?.[0]?.message?.content;
    
    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI service" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: assistantMessage,
      model: "openrouter/claude-sonnet-4"
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}