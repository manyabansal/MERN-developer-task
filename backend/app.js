import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express, { json } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import Message from "./models/Message.js";
import userRoute from "./routes/users.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

import cookieParser from "cookie-parser";
import chatRoute from "./routes/chats.js";
const app = express();
const HOST = "http://localhost:3000";
const server = createServer(app);
const io = new Server(server, {
  pingTimeout:60000,
  cors: {
    origin: HOST,
    methods: ["GET", "POST"],
  },
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
app.options("/users/profile", cors(corsOptions));
app.options("/chats/send", cors(corsOptions));
app.options("/chats/receive", cors(corsOptions));
app.options("/chats/:userId", cors(corsOptions));
app.options("/socket.io", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

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
app.use("/chats", chatRoute);

io.on("connection", (socket) => {
  
  socket.on("setup", (userData)=>{
    socket.join(userData?.id);
    console.log(userData.id);
    socket.emit("connection");
  });
  
  socket.on("new message", (msg,user) => {
    console.log("1.new message");
    io.in(user.id).emit("receive from bot", msg);
    
  });
  socket.on("received", (msg,user)=>{
    console.log("3.")
    io.in(user.id).emit("bot reply", msg);
  })
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8000, (req, res) => {
  console.log("Server is listening");
});
