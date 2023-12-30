// import { promises, readFileSync, createReadStream } from "fs";
// import { resolve } from "path";
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: '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' });

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

import express, { json } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcryptjs"; // Modify this line
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const HOST = "http://localhost:3000";
const salt = bcrypt.genSaltSync(10);
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  credentials: true,
  origin: HOST, // Replace with the actual origin of your React app
};

// Use CORS middleware with the specified options
app.options("/login", cors(corsOptions));
app.use(json());
mongoose
  .connect(
    "mongodb+srv://maanyab007:Ashok1612%40@cluster0.dkwh4lo.mongodb.net/goodspaceDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
  
  app.get('/', (req,res)=>{
    res.send('ok');
  })
  app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password;

    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      res.json({
        status: "FAILED",
        message: "Invalid email entered"
      })
    }
    User.findOne({ email })
    .then((user) => {
      if (user) {
        const userInfo = user;
        const passOk = bcrypt.compareSync(password, userInfo.password);
        if (passOk) {
          const token = jwt.sign(
            { email, id: userInfo._id },
            "Thisismysupersupersupersecretkeydonotdarehackit."
          );
          res.header("Access-Control-Allow-Origin", "http://localhost:3000");
          return res
            .json({
              id: userInfo._id,
              email,
            });
        } else {
          return res.status(401).json({ message: "Wrong password" });
        }
      } else {
        const userInfo = new User({
          email: email,
          password: bcrypt.hashSync(password, salt),
        });

        userInfo.save();
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        return res.json(userInfo);
      }
    })
    .catch((err) => console.log(err));
  });

  app.listen(8000, (req,res)=>{
    console.log("Server is listening");
  })