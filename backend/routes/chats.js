import dotenv from "dotenv";
import OpenAI from "openai";
import { Router } from "express";
import Message from "../models/Message.js";
import jwt from "jsonwebtoken";
const chatRoute = Router();
const HOST = "http://localhost:3000";

dotenv.config();
// { path: "../.env" }
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const messageHistory = [{ content: "Hello, how are you?" }];

async function botResponse(content) {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      // ...messageHistory.map((message) => (
      { role: "user", content: content || "" },
      // )),
    ],
    model: "gpt-3.5-turbo",
  });

  return response.choices[0].message.content;
}

chatRoute.get("/:userId", async(req,res)=>{
   const {userId}= req.params;
   try{
    Message.find({"user":userId})
    .then((msgs)=>{
      res.header("Access-Control-Allow-Origin", HOST);
      res.json(msgs);
    }).catch((err)=>{
      throw err;
    });

   } catch(err){
      console.error(err);
   }
});
chatRoute.post("/send", async (req, res) => {
  const content = req.body.content;
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const info = jwt.verify(token, process.env.SECRET);
  const msg = new Message({
    user: info.id,
    userStatus: "sender",
    content,
  });
  res.header("Access-Control-Allow-Origin", HOST);
  msg.save();
  res.json(msg);
});

chatRoute.post("/receive", async (req, res) => {
  const content = req.body.content;
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const info = jwt.verify(token, process.env.SECRET);
  const response = await botResponse(content);
  const msg = new Message({
    user: info.id,
    userStatus: "receiver",
    content: response,
  });
  res.header("Access-Control-Allow-Origin", HOST);
  msg.save();
  res.json(msg);
});

export default chatRoute;
