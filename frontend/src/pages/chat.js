import { useEffect, useState } from "react";
import {io} from "socket.io-client"
const socket= io("http://127.0.0.1:8000");

function Chat(){
    const [value, setValue]= useState('');
    const sendMessage=()=>{
          socket.emit('chat message', value);
        //   setValue('');
    };
    useEffect(()=>{
        socket.on('connect', ()=>console.log("connected yes"));
    socket.on('disconnect', ()=>console.log("disconnected yes"));
    },[])

    return (
        <div>
            <input onChange={(e)=>setValue(e.target.value)}></input>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chat;