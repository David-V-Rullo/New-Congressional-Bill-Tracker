const router = require("express").Router();
const {User} = require("../../models");
const passport = require("../../config/passport");
const {Favorite} = require("../../models");

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
      zip: req.body.zip,
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
      zip: req.user.zip,
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

//FAVORITES

// CREATE new favorite
router.post("/add_favorite", async (req, res) => {
  console.log("POST /api/user/add_favorite");
  try {
    const dbUserData = await Favorite.create({
      bill_id: req.body.bill_id,
      short_title: req.body.short_title,
      introduced_date: req.body.introduced_date,
      house_passage: req.body.house_passage,
      senate_passage: req.body.senate_passage,
      user_id: req.body.user_id,
    });

    res.redirect(307, "/api/user/login");
    // Or redirect to login web page
    // res.redirect("/login");
  } catch (err) {
    console.log(err.errors[0]);
    res.status(500).json({ messge: err.errors[0]["message"]});
  }
});


//get user favorites

router.get('/:id', async (req, res) => {
  console.log("GET /api/user/:id");
  try {
    const userData = await Favorite.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      
    });

    if (!userData) {
      res.status(404).json({ message: 'No favorited items!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
