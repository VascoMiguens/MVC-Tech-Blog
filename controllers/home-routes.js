const router = require("express").Router();
const withAuth = require("../utils/withAuth");
const { Post, User, Comment } = require("../models");

// homepage route
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render("single-post", {
      post,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
