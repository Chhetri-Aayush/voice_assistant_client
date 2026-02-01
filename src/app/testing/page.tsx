"use client";
import { useWebSocket } from "@/hooks/useWebSocket";

export default function TestingPage() {
  const { messages, sendMessage, isConnected } = useWebSocket(
    "ws://localhost:8000/api/v1/testSocket",
  );
  return (
    <>
      <div> this is the entry div </div>
      <div className="text-lg border-2 border-black rounded cursor-pointer p-2 m-2 w-32">
        this is the div that you will send the message
      </div>
      <div>Messages: {messages.length}</div>
      <div>Is Connected: {isConnected ? "Yes" : "No"}</div>
      <button
        onClick={() => sendMessage("Hello, WebSocket!")}
        className=" cursor-pointer p-2 m-2 bg-blue-500 text-white rounded"
      >
        Send Message
      </button>
    </>
  );
}
