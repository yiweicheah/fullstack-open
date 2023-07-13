const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
});

blogsRouter.get("/api/blogs/:id", (req, res) => {
  Blog.findById(req.params.id).then((blog) => res.json(blog));
});

blogsRouter.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogsRouter;
