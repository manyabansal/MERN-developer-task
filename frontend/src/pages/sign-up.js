import React, { useState } from "react";
import "./css/sign-up.css";
import gImg from "./images/g.png";
function SignUp() {
   const [email, setEmail]= useState("");
   const [password, setPassword]= useState("");

   async function login(ev){
    ev.preventDefault();
    const response= await fetch("http://localhost:8000/users/login",{
     method: 'POST',
     body: JSON.stringify({email, password}),
     headers:{
       "Content-type": "application/json; charset=UTF-8",
       "Access-Control-Allow-Origin": "*"
     },
     credentials: "include"
    });
    if(response.ok){
       window.location.reload();
       window.location.href="/chat";
    }
    else {
        console.error("Failed to fetch:", response.statusText);
      }
 }

  return (
    <div>
      <div className="left-part">
        <img src={gImg} />
        <p>
          Welcome to
          <br /> Goodspace Communications
        </p>
      </div>
      <div className="login-box">
        <form action="/" method="post" onSubmit={login}>
          <p className="login-text">Signup/Login</p>
          <div className="input-area">
            <div className="email-area">
              <label className="email-text">Your Email id</label>
              <input 
              className="email-input" 
              type="email" 
              name="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              />
            </div>
            <div className="pass-area">
              <label className="pass-text">Password</label>
              <input 
              className="pass-input" 
              type="password" 
              name="password"
              id="password"
              value={password}
            onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="submit-btn">
            <div className="btn-text">Lets Go!!</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
