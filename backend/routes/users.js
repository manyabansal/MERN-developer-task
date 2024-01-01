import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);
const userRoute= Router();
const HOST = "http://localhost:3000";

userRoute.post("/login", (req, res) => {
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
            process.env.SECRET
          );
          res.header("Access-Control-Allow-Origin", HOST);
          return res
          .cookie(`token`, token, {
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: "none",
          })
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
        res.header("Access-Control-Allow-Origin", HOST);
        return res
        .cookie(`token`, token, {
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "none",
        })
          .json({
            id: userInfo._id,
            email,
          });
      }
    })
    .catch((err) => console.log(err));
  });
  
  userRoute.get("/profile", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.header("Access-Control-Allow-Origin", HOST);
    const info = jwt.verify(token, process.env.SECRET);
    res.json(info);
  });

  export default userRoute;
