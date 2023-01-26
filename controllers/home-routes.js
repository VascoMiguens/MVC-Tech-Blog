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
    res.status(500).json(err);
  }
});

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
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
      session: req.session,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard Route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
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
    console.log(userData);
    const user = userData.get({ plain: true });
    console.log(user);
    res.render("dashboard", {
      ...user,
      isLoggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit Post Route
router.get("/post/:id/edit", withAuth, async (req, res) => {
  try {
    // FInd post by id
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    // convert postData to plain Javascript object
    const post = postData.get({ plain: true });
    // render edit-post page and pass post object, logged_in status
    res.render("edit-post", {
      ...post,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comments/:id/edit", withAuth, async (req, res) => {
  try {
    // FInd comment by id
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    // convert commentData to plain Javascript object
    const comment = commentData.get({ plain: true });
    console.log(comment);
    // render edit-comment page and pass comment object, logged_in status
    res.render("edit-comment", {
      ...comment,
      isLoggedIn: req.session.isLoggedIn,
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
