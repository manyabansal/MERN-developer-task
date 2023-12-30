import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./css/sign-up.css";
import gImg from "./images/g.png";
function SignUp() {
   const [email, setEmail]= useState("");
   const [password, setPassword]= useState("");
   async function login(ev){
    ev.preventDefault();
    const response= await fetch("http://127.0.0.1:8000/login",{
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
