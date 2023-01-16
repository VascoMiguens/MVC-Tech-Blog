const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/withAuth");

// create new Post
router.post("/", async (req, res) => {
  const newData = {
    title: req.body.title,
    post_content: req.body.content,
    user_id: req.session.user_id,
  };
  try {
    const newPost = await Post.create(newData);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete Post
router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with that id" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
