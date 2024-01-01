import { useEffect, useState, useContext } from "react";
import {io} from "socket.io-client"
import { UserContext } from "../user-context";
const socket= io("http://127.0.0.1:8000",{
    autoConnect: false
});
socket.connect();
function Chat(){
    const [value, setValue]= useState('');
    const {userInfo, setUserInfo}=useContext(UserContext);
    useEffect(() => {
        const checkLoggedIn = async () => {
          try {
            const response = await fetch("http://localhost:8000/users/profile", {
              credentials: "include",
            });
    
            if (response.ok) {
              const info = await response.json();
              setUserInfo(info);
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