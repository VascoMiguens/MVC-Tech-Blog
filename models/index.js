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
});
// Association between Comment and User
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});
// Association between Comment and Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
// Association between Post and Comment
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Post,
  Comment,
};
