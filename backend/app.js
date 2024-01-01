// import { promises, readFileSync, createReadStream } from "fs";
// import { resolve } from "path";
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: 'process.env.OPENAI_API_KEY' });

// const speechFile = resolve("./speech.mp3");

// async function main() {
//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: "Today is a wonderful day to build something people love!",
//   });
//   console.log(speechFile);
//   const buffer = Buffer.from(await mp3.arrayBuffer());
//   await promises.writeFile(speechFile, buffer);
// }
// main();
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express, { json } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const HOST ="http://localhost:3000";
const server = createServer(app);
const io = new Server(server, {
  cors:{
    origin: HOST,
    methods: ["GET", "POST"],
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  credentials: true,
  origin: HOST,
};
app.options("/users/login", cors(corsOptions));
app.options("/socket.io", cors(corsOptions))
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/users", userRoute);

io.on("connection", (socket) => {
  console.log(" user connected");

  socket.on('chat message', (msg)=>{
    console.log(msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});

server.listen(8000, (req, res) => {
  console.log("Server is listening");
});
