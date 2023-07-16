const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const user = await User.findById(body.userID);

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.notes.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);

  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const blog = { title: title, author: author, url: url, likes: likes };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });

  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
