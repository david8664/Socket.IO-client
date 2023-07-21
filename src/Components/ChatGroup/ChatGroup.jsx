// ChatGroup.js

import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import socketManager from "../../Functions/socketManager";

export default function ChatGroup({
  inputMessage,
  setInputMessage,
  chatHistory,
  setChatHistory,
  username,
}) {
  const messagesContainerRef = useRef(null);

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

  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages are added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className={styles["chat-container"]}>
      <ul ref={messagesContainerRef} className={styles.messages}>
        {chatHistory.map((message, index) => (
          <li
            key={index}
            className={
              message.startsWith(username)
                ? styles.myMessage
                : styles.otherMessage
            }
          >
            {message}{" "}
          </li>
        ))}
      </ul>
      <div className={styles["chat-input"]}>
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter Message"
          type="text"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
