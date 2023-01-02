const Comment = require("../models/Comment");

const commentsData = [
  {
    comment_text: "It is used universally when you dont know what to say!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "It is very useful to demonstrate the usability of an app",
    user_id: 1,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentsData);

module.exports = seedComments;
