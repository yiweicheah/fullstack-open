const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.length === 0 ? 0 : blogs.reduce((a, b) => a + b.likes, 0);

  return likes;
};

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((a, b) => (a.likes > b.likes ? a : b), {});

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  const groupedAuthors = lodash.groupBy(blogs, "author");
  let authorsArray = [];
  for (const author in groupedAuthors) {
    const obj = { [author]: groupedAuthors[author] };
    authorsArray.push(obj);
  }

  const filteredAuthor = authorsArray.reduce(
    (a, b) => (a.length > b.length ? a : b),
    {}
  );

  return {
    author: Object.keys(filteredAuthor)[0],
    blogs: filteredAuthor[Object.keys(filteredAuthor)].length,
  };
};

const mostLikes = (blogs) => {
  const groupedAuthors = lodash.groupBy(blogs, "author");
  let info = [];
  for (const author in groupedAuthors) {
    const likes = groupedAuthors[author].reduce((a, b) => (a += b.likes), 0);
    info.push({ author: author, likes: likes });
  }
  const most = info.reduce((a, b) => (a.likes > b.likes ? a : b), {});
  console.log(most);
  return most;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
