import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import sendLogo from "./images/send.png"

import "./css/chat.css";
const socket = io("http://127.0.0.1:8000");
// socket.connect();
function Chat() {
  const [content, setContent] = useState("");
  // const {userInfo, setUserInfo}=useContext(UserContext);
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/profile", {
          credentials: "include",
        });

        if (response.ok) {
          const info = await response.json();
          // setUserInfo(info);
          const email = info?.email;

          if (!email) {
            window.location.href = "/";
          }
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        window.location.href = "/";
      }
    };

    checkLoggedIn();
  }, []);

  const sendMessage = async (ev) => {
    //   socket.emit('chat message', value);
    //   setValue('');
    ev.preventDefault();
    await fetch("http://localhost:8000/chats/send", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    });
    const response = await fetch("http://localhost:8000/chats/receive", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    });
  };

  return (
    <div>
      <div className="chat-container">
        <div className="user-chat">Hi</div>
        <div className="bot-chat">Hi</div>
        <div className="type-area">
          <input
            className="text-input"
            type="text"
            name="content"
            placeholder="Type message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></input>
          <button className="send-btn" onClick={sendMessage}>
            <img src={sendLogo}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
