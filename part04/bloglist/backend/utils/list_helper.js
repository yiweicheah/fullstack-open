const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0);

  return total;
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.sort((a, b) => b.likes - a.likes)[0];

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorCount = lodash.countBy(blogs, "author");

  const mostAuthor = Object.keys(authorCount).reduce((a, b) =>
    authorCount[a] > authorCount[b] ? a : b
  );

  return {
    author: mostAuthor,
    blogs: authorCount[mostAuthor],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
