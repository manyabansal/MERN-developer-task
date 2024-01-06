import { useState } from "react";
import { io } from "socket.io-client";
import "./css/chat.css";
import ChatContainer from "../components/chat-container";

const socket = io("http://127.0.0.1:8000");

function Chat() {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
 

  const sendToBot = async (cont) => {
    try {
      const response2 = await fetch("http://localhost:8000/chats/receive", {
        method: "POST",
        body: JSON.stringify({ cont }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
      });
      const result2 = await response2.json();
      socket.emit("received", result2, userInfo);
    } catch (error) {
      console.error("Error receiving messages:", error);
    }
  };
  const sendMessage = async (ev) => {
    ev.preventDefault();

    try {
      const response1 = await fetch("http://localhost:8000/chats/send", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
      });
      const result1 = await response1.json();

      socket.emit("new message", result1, userInfo);
    } catch (err) {
      console.error("Error sending message");
    }

    setContent("");
  };

  return (
    <div className="chat-page">
       <ChatContainer
        content={content}
        setContent={setContent}
        messages={messages}
        setMessages={setMessages}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        sendMessage={sendMessage}
        sendToBot={sendToBot}
        socket={socket}
      />
    </div>
  );
}

export default Chat;
