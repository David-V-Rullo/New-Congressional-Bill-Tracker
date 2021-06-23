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
router.get("/user", isAuthenticated,  (req, res) => {
  //call getUser
  const userData = {
    name: 'David',
    favoriteBills: [{"bill_id": "hr4004-117",
    "bill_slug": "hr4004",
    "bill_type": "hr",
    "number": "H.R.4004",
    "bill_uri": "https://api.propublica.org/congress/v1/117/bills/hr4004.json",
    "title": "To prohibit Federal funding for institutions of higher education that have partnerships with schools or other organizations funded by North Korea, and for other purposes.",
    "short_title": "To prohibit Federal funding for institutions of higher education that have partnerships with schools or other organizations funded by North Korea, and for other purposes.",
    "sponsor_title": "Rep.",
    "sponsor_id": "L000589",
    "sponsor_name": "Debbie Lesko",
    "sponsor_state": "AZ",
    "sponsor_party": "R",
    "sponsor_uri": "https://api.propublica.org/congress/v1/members/L000589.json",
    "gpo_pdf_uri": null,
    "congressdotgov_url": "https://www.congress.gov/bill/117th-congress/house-bill/4004",
    "govtrack_url": "https://www.govtrack.us/congress/bills/117/hr4004",
    "introduced_date": "2021-06-17",
    "active": false,
    "last_vote": null,
    "house_passage": null,
    "senate_passage": null,
    "enacted": null,
    "vetoed": null,
    "cosponsors": 4,
    "cosponsors_by_party": {
      "R": 4
    },
    "committees": "House Education and Labor Committee",
    "committee_codes": [
      "HSFA"
    ],
    "subcommittee_codes": [],
    "primary_subject": "",
    "summary": "",
    "summary_short": "",
    "latest_major_action_date": "2021-06-17",
    "latest_major_action": "Referred to the Committee on Foreign Affairs, and in addition to the Committee on Education and Labor, for a period to be subsequently determined by the Speaker, in each case for consideration of such provisions as fall within the jurisdiction of the committee concerned."
  },{"bill_id": "hr4020-117",
  "bill_slug": "hr4020",
  "bill_type": "hr",
  "number": "H.R.4020",
  "bill_uri": "https://api.propublica.org/congress/v1/117/bills/hr4020.json",
  "title": "To reform United States drug policy, and for other purposes.",
  "short_title": "To reform United States drug policy, and for other purposes.",
  "sponsor_title": "Rep.",
  "sponsor_id": "W000822",
  "sponsor_name": "Bonnie Watson Coleman",
  "sponsor_state": "NJ",
  "sponsor_party": "D",
  "sponsor_uri": "https://api.propublica.org/congress/v1/members/W000822.json",
  "gpo_pdf_uri": null,
  "congressdotgov_url": "https://www.congress.gov/bill/117th-congress/house-bill/4020",
  "govtrack_url": "https://www.govtrack.us/congress/bills/117/hr4020",
  "introduced_date": "2021-06-17",
  "active": false,
  "last_vote": null,
  "house_passage": null,
  "senate_passage": null,
  "enacted": null,
  "vetoed": null,
  "cosponsors": 10,
  "cosponsors_by_party": {
    "D": 10
  },
  "committees": "House Budget Committee",
  "committee_codes": [
    "HSJU"
  ],
  "subcommittee_codes": [],
  "primary_subject": "",
  "summary": "",
  "summary_short": "",
  "latest_major_action_date": "2021-06-17",
  "latest_major_action": "Referred to the Committee on the Judiciary, and in addition to the Committees on Energy and Commerce, Oversight and Reform, Financial Services, Transportation and Infrastructure, House Administration, Armed Services, and the Budget, for a period to be subsequently determined by the Speaker, in each case for consideration of such provisions as fall within the jurisdiction of the committee concerned."
},{"bill_id": "hr4016-117",
"bill_slug": "hr4016",
"bill_type": "hr",
"number": "H.R.4016",
"bill_uri": "https://api.propublica.org/congress/v1/117/bills/hr4016.json",
"title": "To amend the Internal Revenue Code of 1986 to impose a tax on the use of certain electric highway vehicles to fund the Highway Trust Fund.",
"short_title": "To amend the Internal Revenue Code of 1986 to impose a tax on the use of certain electric highway vehicles to fund the Highway Trust Fund.",
"sponsor_title": "Rep.",
"sponsor_id": "S001199",
"sponsor_name": "Lloyd Smucker",
"sponsor_state": "PA",
"sponsor_party": "R",
"sponsor_uri": "https://api.propublica.org/congress/v1/members/S001199.json",
"gpo_pdf_uri": null,
"congressdotgov_url": "https://www.congress.gov/bill/117th-congress/house-bill/4016",
"govtrack_url": "https://www.govtrack.us/congress/bills/117/hr4016",
"introduced_date": "2021-06-17",
"active": false,
"last_vote": null,
"house_passage": null,
"senate_passage": null,
"enacted": null,
"vetoed": null,
"cosponsors": 0,
"cosponsors_by_party": {},
"committees": "House Ways and Means Committee",
"committee_codes": [
  "HSWM"
],
"subcommittee_codes": [],
"primary_subject": "",
"summary": "",
"summary_short": "",
"latest_major_action_date": "2021-06-17",
"latest_major_action": "Referred to the House Committee on Ways and Means."
}],
    representatives: {
      senators: [{
        name: 'Cory Booker',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Cory_Booker%2C_official_portrait%2C_114th_Congress.jpg/193px-Cory_Booker%2C_official_portrait%2C_114th_Congress.jpg'
      },{
        name: 'Robert Menendez',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Robert_Menendez_official_Senate_portrait.jpg/189px-Robert_Menendez_official_Senate_portrait.jpg'
      }],
      congressRep: {
        name: 'Mikie Sherrill',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Mikie_Sherrill%2C_official_portrait%2C_116th_Congress_2.jpg/192px-Mikie_Sherrill%2C_official_portrait%2C_116th_Congress_2.jpg'
      }
    }
  }
  console.log("GET /user");
res.render('user', {userData})
});








module.exports = router;
