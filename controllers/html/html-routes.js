const router = require('express').Router();
const path = require("path");
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const axios = require('axios');
const passport = require('passport')
// const defaultSearch = require("../../config/middleware/defaultSearch")

// GET all galleries for homepage
router.get("/", async (req, res) => {
  console.log("GET /");
    try {
            var key = "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH";
            const apiData = await axios.get("https://api.propublica.org/congress/v1/bills/search.json", {headers: { "X-API-Key": key }});
            console.log(apiData.data.results);
            const bill = apiData.data.results[0].bills[0];
            res.render('home', {bill})
        } catch (err) {
            console.error(err);
            res.status(401).json(err);
        }
    });

    router.get("/default", async (req, res) => {
      console.log("GET /");
        try {
                var key = "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH";
                const apiData = await axios.get("https://api.propublica.org/congress/v1/bills/search.json", {headers: { "X-API-Key": key }});
                console.log(apiData.data.results);
                const bill = apiData.data.results[0].bills
                res.render('default', {bill})
            } catch (err) {
                console.error(err);
                res.status(401).json(err);
            }
        });
    
router.get("/login", (req, res) => {
  console.log("GET /login");
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/user");
  }
  res.render('login')
});

router.get("/signup", (req, res) => {
  console.log("GET /signup");
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/user");
  }
  res.render('signup')
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/user", (req, res) => {
  //call getUser
  console.log("GET /user");
res.render('user', {name:"dave", hobby:"farting"})
});

module.exports = router;
