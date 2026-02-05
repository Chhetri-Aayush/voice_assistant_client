import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/socket";

export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     role: "assistant",
  //     content: "नमस्ते! म तपाईंलाई कसरी सहयोग गर्न सक्छु?",
  //   },
  // ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socketRef.current.onopen = () => {
      console.log("finally it is connected");
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      console.log("message sent form the backend is :", event.data);
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  const sendMessage = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
      // console.log("message sent to the backend is :", data);
      const dataWithRole = { role: "user" as const, content: data.content };
      setMessages((prev) => [...prev, dataWithRole]);
    } else {
      console.log("websocket is not open so it can't send the message ");
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
