const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Association between user and post enabling the retrieval of a specific user's multiple posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Association between user and comment enabling the retrieval of a specific user's multiple comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// Association between Post and User
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});
// Association between Post and Comment
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});
// Association between Comment and Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});
// Association between Post and Comment enabling the retrieval of a specific Post's multiple comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
