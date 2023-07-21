import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import ChatGroup from "./ChatGroup";
import socketManager from "../Functions/socketManager";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const handleChatEvents = (msg) => {
      setChatHistory((prevHistory) => [...prevHistory, msg]);
    };

    socketManager.socket.on("userConnected", handleChatEvents);
    socketManager.socket.on("userDisconnected", handleChatEvents);

    return () => {
      socketManager.socket.off("userConnected", handleChatEvents);
      socketManager.socket.off("userDisconnected", handleChatEvents);
    };
  }, []);

  return (
    <>
      <h1>Chat Project</h1>
      {isConnected ? (
        <ChatGroup
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
      ) : (
        <LoginForm
          setUsername={setUsername}
          username={username}
          setIsConnected={setIsConnected}
          isConnected={isConnected}
        />
      )}
    </>
  );
}
