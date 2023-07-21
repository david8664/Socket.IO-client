import React, { useState, useEffect } from "react";
import socketManager from "../Functions/socketManager";

export default function ChatGroup({
  inputMessage,
  setInputMessage,
  chatHistory,
  setChatHistory,
}) {
  const handleSendMessage = () => {
    socketManager.socket.emit("uploadMessage", inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleChatEvents = (msg) => {
      setChatHistory((prevHistory) => [...prevHistory, msg]);
    };

    socketManager.socket.on("downloadMessage", handleChatEvents);

    return () => {
      socketManager.socket.off("downloadMessage", handleChatEvents);
    };
  }, [chatHistory]);

  return (
    <>
      <ul className="messages">
        {chatHistory.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter Message"
        type="text"
      />
      <button onClick={handleSendMessage}>Send</button>
    </>
  );
}
