import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const { messages, sessionId } = await req.json();

    // Ensure messages and sessionId are provided
    if (!Array.isArray(messages) || messages.length === 0 || !sessionId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Get the last message content
    const lastMessage = messages[messages.length - 1].content;

    // Generate a response from the AI service
    const response = await ragChat.chat(lastMessage, { streaming: true, sessionId });

    // Adapt the response and return it
    return aiUseChatAdapter(response);
  } catch (error) {
    // Return a generic error message if something goes wrong
    console.error("Error handling chat request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};