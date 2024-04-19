import fs from "fs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Post from "../models/PostModel.js";
import connectDB from "../config/connectDB.js";
import S3Upload from "../utils/S3Upload.js";

export const createPost = async (req, res) => {
  const { mimetype, originalname, path } = req.file;
  const { title, summary, content } = req.body;

  const { token } = req.cookies;
  const userDoc = jwt.verify(token, process.env.JWT_SECRET);

  if(userDoc){
    const newPost = new Post({
      title,
      author: userDoc,
      summary,
      content,
      image: ''
    });

    const newName = newPost._id + originalname.split('.')[1];

    const link = await S3Upload('posts', path, newName, mimetype);
    newPost.image = link;

    try {
      await connectDB();
      await newPost.save();
      res.send("ok");
    } catch (error) {
      console.log(error);
    }

  }
};

export const getAllPosts = async (req, res) => {
  const page = req.params.page;
  const pagePerCount = 2;
  const skip = (page - 1) * pagePerCount;

  try {
    await connectDB();
    const allPosts = await Post.find();
    const posts = await Post.find({}).skip(skip).limit(pagePerCount).sort({ createdAt: -1 });
    const collection = mongoose.connection.db.collection('categories');
    const categories = await collection.find({}).sort({category: 1}).toArray();
    const pageCount = allPosts.length % pagePerCount === 0 ? allPosts.length / pagePerCount : Math.ceil(allPosts.length / pagePerCount);
    res.send({posts, categories, pageCount});
  } catch (error) {
    res.send("Unable to fetch the posts. Try again later");
  }
};

export const getFilteredPosts = async (req, res) => {
  const {category, page: pageNum, value} = req.query;
  const page = parseInt(pageNum);
  const pagePerCount = 2;
  const skip = (page - 1) * pagePerCount;
  let filteredPosts, posts;

  console.log({category, page, value});

  try {
    await connectDB();
    const collection = mongoose.connection.db.collection('categories');
    const categories = await collection.find({}).sort({category: 1}).toArray();
    if(category !== 'Categories' && value !== 'none'){
      filteredPosts = await Post.find({title: {$regex: value, $options: "i"}, categories: category});
      posts = await Post.find({title: {$regex: value, $options: "i"}, categories: category}).skip(skip).limit(pagePerCount).sort({ createdAt: -1 });
    }
    else if(category !== 'Categories' && value === 'none'){
      filteredPosts = await Post.find({categories: category});
      posts = await Post.find({categories: category}).skip(skip).limit(pagePerCount).sort({ createdAt: -1 });
    }
    else{
      filteredPosts = await Post.find({title: {$regex: value, $options: "i"}});
      posts = await Post.find({title: {$regex: value, $options: "i"}}).skip(skip).limit(pagePerCount).sort({ createdAt: -1 });
    }
    const pageCount = filteredPosts.length % pagePerCount === 0 ? filteredPosts.length / pagePerCount : Math.ceil(filteredPosts.length / pagePerCount);
    res.send({posts, categories, pageCount});
  } catch (error) {
    res.send("Unable to fetch the posts. Try again later");
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.id;
  const action = req.params.action;
  const { token } = req.cookies;

  if (action === "edit") {
    if (token) {
      const userDoc = jwt.verify(token, process.env.JWT_SECRET);
      if(userDoc){

        try {
            await connectDB();
            const post = await Post.findById(postId);
            if(JSON.stringify(userDoc._id) === JSON.stringify(post.author._id))
                res.json(post);
            else
                res.status(400).json("You are not authorised to edit this post");

          } catch (error) {
            res.status(404).json("Couldn\'t fetch the post. Try again later");
          }

      }
    } else {
      res.status(400).json("You are not authorised to edit this post");
    }
  }else{
    try {
        await connectDB();
        const post = await Post.findById(postId);
        res.json(post);
      } catch (error) {
        res.status(404).json("Couldn\'t fetch the post. Try again later");
      }

  }
};

export const updatePost = async (req, res) => {
  const { id, title, author, summary, content, file: image } = req.body;

  let newFileName = "";

  if (req.file) {
    const { originalname, path } = req.file;
    newFileName = path + "." + originalname.split(".")[1];
    fs.renameSync(path, newFileName);
  }else
    newFileName = image;

    try{
        await connectDB();
        await Post.updateOne({_id: id}, {title, summary, author: JSON.parse(author), summary, image: newFileName});
        res.send('Post successfully updated');
    }catch(err){
        console.log(err);
        res.status(502).json('Unable to update the post');
    }
};
