import { client } from "../index.js";

export async function deleteMoviesById(id) {
    return await client.db("b33wd").collection("movies").deleteOne({ id: id });
}
export async function updateMoviesById(id, data) {
    return await client.db("b33wd").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function postMovies(data) {
    return await client.db("b33wd").collection("movies").insertMany(data);
}
export async function getMoviesById(id) {
    return await client.db("b33wd").collection("movies").findOne({ id: id });
}
export async function getAllMovies() {
    return await client.db("b33wd").collection("movies").find({}).toArray();
}
