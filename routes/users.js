import express from "express";
import {createUser , getUserByName } from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        if (isUserExist){
            response.status("400").send({msg : "username already exists try different username"});
        }
        else{
            const result=await createUser({
                username: username,
                password: hashedPassword,
            });
            response.send(result);
        }
      
  });
  router.post("/login",async function(request,response){
    const {username , password}= request.body;
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);
    //check for username
    
    if(!userFromDB){
        response.status(401).send({msg: "Invalid credentials"})
    } else{
        const storedDBPassword =userFromDB.password;
        const isPasswordMatch = await bcrypt.compare(password, storedDBPassword);
        console.log(isPasswordMatch);
        // isPasswordMatch returns boolean value
        if(isPasswordMatch){
            const token =jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY);
            response.send({msg: "Successful login", token: token});
        } else {
            response.status(401).send({msg :"Invalid credentials"});
        }
    }   
});
  export const userRouter= router;