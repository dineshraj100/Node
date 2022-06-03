import express from "express";
import { getAllMovies, getMoviesById, postMovies, updateMoviesById, deleteMoviesById } from "./helper.js";
const router=express.Router();

router.get("/movies",async function (request, response) {
    const movies= await getAllMovies();
      response.send(movies);
    });
    router.get("/movies/:id",async function (request, response) {
        console.log(request.params);
        const {id}=request.params;
        const movie= await getMoviesById(id);
      
        movie ? response.send(movie): response.status(404).send({msg: "no such movie is there"});
    });
  
    // express.json()-> converting to JSON
    // Inbuilt middleware
    
    router.post("/movies", async function (request, response) {
      const data=request.body;
      console.log(data);
      //db.movies.insertMany(data)
      const result= await postMovies(data);
      response.send(result);
    });
  
    router.put("/movies/:id", async function (request, response) {
      const data=request.body;
      console.log(data);
      const {id}=request.params;
      //db.movies.updateOne(data)
      const result= await updateMoviesById(id, data);
      response.send(result);
    });
  
    router.delete("/movies/:id",async function (request, response) {
      console.log(request.params);
      const {id}=request.params;
      const movie=await deleteMoviesById(id);
    
      movie.deletedCount>0 ? response.send(movie): response.status(404).send({msg: "no such movie is there"});
  });
  
  export const moviesRouter = router;


