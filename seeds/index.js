const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const seedUsers = require("./user-seeds.json");
const seedPosts = require("./post-seeds.json");
const seedComments = require("./comment-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //create users through the seeds and use hooks to encript passowrd
  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  const posts = [];
  //randomize allocation of posts
  for (const post of seedPosts) {
    const newPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    posts.push(newPost);
  }

  //randomize allocation of comments
  for (const comment of seedComments) {
    await Comment.create({
      ...comment,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit[0];
};

seedDatabase();
