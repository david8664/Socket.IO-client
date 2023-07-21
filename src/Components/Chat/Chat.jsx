import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import LoginForm from "../LoginForm/LoginForm";
import ChatGroup from "../ChatGroup/ChatGroup";
import socketManager from "../../Functions/socketManager";

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
      <h1 className={styles.header}>Chat Project</h1>
      {isConnected ? (
        <ChatGroup
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          username={username}
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
