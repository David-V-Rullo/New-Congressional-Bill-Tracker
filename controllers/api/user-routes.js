const router = require("express").Router();
const {User} = require("../../models");
const passport = require("../../config/passport");

// Login
router.post("/login", passport.authenticate("local"), async (req, res) => {
  console.log("POST /api/user/login");

  try {
    res
      .status(200)
      .json({ user: req.user, message: "You are now logged in!" });
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

// CREATE new user thru signup
router.post("/signup", async (req, res) => {
  console.log("POST /api/user/signup");
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.redirect(307, "/api/user/login");
    // Or redirect to login web page
    // res.redirect("/login");
  } catch (err) {
    console.log(err.errors[0]);
    res.status(500).json({ messge: err.errors[0]["message"]});
  }
});

router.get("/user_data", (req, res) => {
  console.log("GET /api/user/user_data");
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      name: req.user.name,
      email: req.user.email,
      id: req.user.id
    });
  }
});
// Logout
router.get("/logout", (req, res) => {
  console.log("GET - /api/user/logout");
  if (req.user) {
    req.logout();
    res.redirect("/");
  } else {
    res.status(404).end();
  }
});

module.exports = router;
