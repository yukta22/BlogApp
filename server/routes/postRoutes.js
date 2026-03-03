import express from "express";
import { addComment, createPost, deletePost, getPosts, toggleLike } from "../controller/postController.js";
import { protect } from "../middleware/authmiddleware.js";
import upload from "../middleware/multermiddleware.js";

const postRoute = express.Router();

postRoute.post("/create", protect, upload.single("image"), createPost);
postRoute.get("/", getPosts);
postRoute.delete("/:id", protect, deletePost);
postRoute.put("/like/:id", protect, toggleLike);
postRoute.post("/comment/:id", protect, addComment);

export default postRoute;