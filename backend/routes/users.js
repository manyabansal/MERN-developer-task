import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs"; 

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
          res.header("Access-Control-Allow-Origin", HOST);
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
        res.header("Access-Control-Allow-Origin", HOST);
        return res.json(userInfo);
      }
    })
    .catch((err) => console.log(err));
  });
  

  export default userRoute;
