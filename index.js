// const express = require("express");  //traditional import method before es6 
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {moviesRouter} from "./routes/movies.js"
import  bcrypt from "bcrypt";   
import { userRouter } from "./routes/users.js";
dotenv.config();
const app = express();
const PORT=process.env.PORT;

app.use(express.json());
// offline mongodb connection url
// const MONGO_URL="mongodb://localhost";
// online mongodb connection url
const MONGO_URL=process.env.MONGO_URL;
//Node-Mongodb connecting part
async function createConnection(){
  const client= new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb is connected");
  return client;
}

export const client = await createConnection();

// "/"- home path
app.get("/", function (request, response) {
  response.send("Hello World 🎉");
});

app.use("/movies", moviesRouter);
app.use("/users", userRouter);
app.listen(PORT, ()=> console.log(`App is started in ${PORT}`));
