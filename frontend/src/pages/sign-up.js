import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./css/sign-up.css";
import gImg from "./images/g.png";
function SignUp() {
  return <div>
    <div className="left-part">
       <img src={gImg}/>
       <p>Welcome to<br /> Goodspace Communications</p>
    </div>
    <div className="login-box">
        <form>
       <p className="login-text">
         Signup/Login
       </p>
       <div className="input-area">
        <div className="email-area">
        <label className="email-text">Your Email id</label>
        <input
         className="email-input"
         type="email"
        />
        </div>
         <div className="pass-area">
         <label className="pass-text">Password</label>
        <input
        className="pass-input"
         type="password"
        />
         </div>
         
       </div>
       <button className="submit-btn">< div className="btn-text">Lets Go!!</div></button>
       </form>
    </div>
  </div>
}

export default SignUp;
