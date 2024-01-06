import React from "react";
import ScrollableFeed from 'react-scrollable-feed'
const ScrollableChat=({messages})=>{
    return <div className="scroll-area">
        <ScrollableFeed >
        {messages.map((msg)=>{
        return <div className={`${msg.userStatus==="sender"? "user-chat-div":"bot-chat-div"}`}><div className={`${msg.userStatus==="sender"? "user-chat":"bot-chat"} chat-message`}>{msg.content}</div></div>
      })}
      </ScrollableFeed>
      </div>
}

export default ScrollableChat;