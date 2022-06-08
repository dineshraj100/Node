import express from "express";
import {createUser , getUserByName } from "./helper.js";
import bcrypt from "bcrypt";
const router =express.Router();

async function genHashedPassword(password){
    //bcrypt.genSalt(No.of rounds)
    const No_of_Rounds =10;
    const salt= await bcrypt.genSalt(No_of_Rounds);
    const hashedPassword= await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  
  router.post("/signup",async function(request,response){
      const {username , password}= request.body;

      const hashedPassword= await genHashedPassword(password);
      const isUserExist = await getUserByName(username);
      console.log(username ,isUserExist);

    // Task -> if User exist -> user already exists
    // allow user to be created

    //   const result=await createUser({
    //       username: username,
    //       password: hashedPassword,
    //   });
      response.send(isUserExist);
  });

  export const userRouter= router;