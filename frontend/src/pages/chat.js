import { useEffect, useState, useParams} from "react";
import { io } from "socket.io-client";
import sendLogo from "./images/send.png"
import {UserContext} from "../user-context.js"
import "./css/chat.css";
const socket = io("http://127.0.0.1:8000");
// socket.connect();
function Chat() {
  const [content, setContent] = useState("");
  const [messages, setMessages]= useState([]);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/profile", {
          credentials: "include",
        });
  
        if (response.ok) {
          const info = await response.json();
          setUserInfo(info);
          console.log(info.id);
          const email = info?.email;
  
          if (!email) {
            window.location.href = "/";
          } else {
            // console.log("ins")
            // Move fetchMessages inside the block to ensure userInfo is updated
            const fetchMessages = async () => {
              try {
                if (info?.id) {
                  // console.log("hii")
                  const pastMessages = await fetch(`http://localhost:8000/chats/${info.id}`, {
                    credentials: "include",
                  });
  
                  if (pastMessages.ok) {
                    // console.log("hiii")
                    const mess = await pastMessages.json();
                    setMessages(mess);
                    console.log(messages);
                  }
                }
              } catch (error) {
                console.error("Error fetching user profile:", error);
              }
            };
  
            fetchMessages();
          }
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching chats", error);
        window.location.href = "/";
      }
    };
  
    checkLoggedIn();
  }, []); // Empty dependency array ensures useEffect runs once on mount
  

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

      const response2 = await fetch("http://localhost:8000/chats/receive", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
      });
      const result2 = await response2.json();


      setContent("");
      setMessages((prevMessages) => [...prevMessages, result1, result2]);

  console.log(result1);
    } catch (error) {
      console.error("Error sending/receiving messages:", error);
    }
    
  
  };
  

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg)=>{
          return <div className={`${msg.userStatus==="sender"? "user-chat":"bot-chat"}`}>{msg.content}</div>
        })}
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
