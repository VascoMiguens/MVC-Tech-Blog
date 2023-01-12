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
              attributes: ["username"],
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
    res.render("single-post", {
      post,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard Route
router.get("/dashboard", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
        },
        {
          model: Comment,
        },
      ],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render("dashboard", {
      ...user,
      isLoggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("sign-up");
});

module.exports = router;
