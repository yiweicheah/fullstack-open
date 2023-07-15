const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
}, 100000);

describe("blogs", () => {
  test("have the correct legnth when returned", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test("have the id key", async () => {
    const res = await api.get("/api/blogs");

    res.body.map((blog) => expect(blog.id).toBeDefined());
  });
});

describe("added blog", () => {
  beforeEach(async () => {
    const newBlog = {
      title: "test",
      author: "test",
      url: "test",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("is successful", async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("test");
  });

  test("has likes defaulted to 0 if not specified", async () => {
    const blogsAtEnd = await helper.blogsInDb();
    const addedBlog = blogsAtEnd[blogsAtEnd.length - 1];

    expect(addedBlog.likes).toEqual(0);
  });

  test("returns error 400 if either title or url are missing", async () => {
    const newBlog = {
      title: "test",
      author: "test",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("blog", () => {
  test("can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(blogToDelete.title);
  });

  test("can be edited", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToEdit = blogsAtStart[0];
    const updatedBlog = {
      ...blogToEdit,
      likes: blogToEdit.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const editedBlog = blogsAtEnd[0];

    expect(editedBlog.likes).toEqual(blogToEdit.likes + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
