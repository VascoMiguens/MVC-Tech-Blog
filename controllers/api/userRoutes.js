const router = require("express").Router();
const withAuth = require("../../utils/withAuth");
const { User, Post, Comment } = require("../../models");

//Signup up Route, Create a new User
router.post("/signup", async (req, res) => {
  const newData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const newUser = await User.create(newData);
    req.session.save(() => {
      req.session.isLoggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "incorrect username or password, please try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status()
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.isLoggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
