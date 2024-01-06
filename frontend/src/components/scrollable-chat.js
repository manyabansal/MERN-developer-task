import React, { useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  const { speak, voices } = useSpeechSynthesis();
  
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.userStatus === "receiver") {
      const customOptions = {
        text: lastMessage.content,
        voice: voices.find(
          (voice) => voice.name === "Google UK English Female"
        ),
      };

      speak(customOptions);
    }
  }, [messages]);
  return (
    <div className="scroll-area">
      <ScrollableFeed>
        {messages.map((msg, i) => {
          return (
            <div
              key={i}
              className={`${
                msg.userStatus === "sender" ? "user-chat-div" : "bot-chat-div"
              }`}
            >
              <div
                className={`${
                  msg.userStatus === "sender" ? "user-chat" : "bot-chat"
                } chat-message`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
