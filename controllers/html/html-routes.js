const router = require('express').Router();
const path = require("path");
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const axios = require('axios');

// GET all galleries for homepage
router.get("/", async (req, res) => {
  console.log("GET /");
    try {
      // router.get("/probill", async (req, res) => {
      //   console.log("GET /api/ext/probill");
      //   try {
            var key = "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH";
            console.log(req.body.key);
            console.log("THE URL: " + req.body.url);
            const apiData = await axios.get("https://api.propublica.org/congress/v1/bills/search.json", {headers: { "X-API-Key": key }});
            // const apiData = await axios.get(
            //     "url": "https://api.propublica.org/congress/v1/bills/search.json",
            //        "key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH"
            console.log(apiData.data);
            // res.status(200).json(apiData.data);
            res.render('home', {apiData})
        } catch (err) {
            console.error(err);
            res.status(401).json(err);
        }
    });
    
router.get("/login", (req, res) => {
  console.log("GET /login");
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.render('login')
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/user", (req, res) => {
  console.log("GET /members");
res.render('user')
});

module.exports = router;
