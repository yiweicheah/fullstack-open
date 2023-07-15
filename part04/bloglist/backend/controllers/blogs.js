const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get("//:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);

  const result = await blog.save();

  res.status(201).json(result);
});

module.exports = blogsRouter;
