import { useEffect } from "react";
import sendLogo from "./images/send.png";
import ScrollableChat from "./scrollable-chat";

function ChatContainer({
  content,
  setContent,
  messages,
  setMessages,
  userInfo,
  setUserInfo,
  sendMessage,
  sendToBot,
  socket,
}) {
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/profile", {
          credentials: "include",
        });

        if (response.ok) {
          const info = await response.json();
          const email = info?.email;

          if (!email) {
            window.location.href = "/";
          } else {
            setUserInfo(info);
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
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("setup", userInfo);
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
    };
  }, [userInfo]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (userInfo?.id) {
          // console.log("hii")
          const pastMessages = await fetch(
            `http://localhost:8000/chats/${userInfo.id}`,
            {
              credentials: "include",
            }
          );

          if (pastMessages.ok) {
            // console.log("hiii")
            const mess = await pastMessages.json();
            setMessages(mess);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchMessages();
  }, [userInfo]);

  useEffect(() => {
    socket.on("receive from bot", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log("2. receive fromt bot");
      sendToBot(msg.content);
    });
    socket.on("bot reply", (msg) => {
      console.log("4");
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off("connection");
      socket.off("receive from bot");
      socket.off("bot reply");
    };
  }, []);

  return (
    <div className="chat-container">
      <ScrollableChat messages={messages} />
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
          <img src={sendLogo} />
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
