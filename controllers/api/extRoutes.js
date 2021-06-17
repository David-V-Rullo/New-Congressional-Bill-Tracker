const router = require("express").Router();
const passport = require("../../config/passport");
const axios = require('axios');
​
//Required body for GET /propublica
// {
// 	"url": "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc",
//   "key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH"
// }
​
router.get("", async (req, res) => {
    console.log("GET /api/ext/propublica");
    try {
        var key = req.body.key;
        console.log("THE URL: " + req.body.url);
        const apiData = await axios.get(req.body.url, {headers: { "X-API-Key": key }});
        // const apiData = await axios.get(
        //     "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc",
        //     {
        //         headers: { "X-API-Key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH" },
        //     });
        console.log(apiData.data);
        res.status(200).json(apiData.data);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
});
​
​
//Required body for GET /wiki
// {
// 	"url": "query url",
// }
router.get("/wiki", async (req, res) => {
    console.log("GET /api/ext/wiki");
    try {
        console.log("THE URL: " + req.body.url);
        const apiData = await axios.get(req.body.url);
        //const apiData = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/An%C3%ADbal_Acevedo_Vil%C3%A1");
        console.log(apiData.data);
        res.status(200).json(apiData.data);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
});
​
        
​
//20 latest bills, default search
router.get("/probill", async (req, res) => {
    console.log("GET /api/ext/probill");
    try {
        var key = "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH";
        console.log(req.body.key);
        console.log("THE URL: " + req.body.url);
        const apiData = await axios.get("https://api.propublica.org/congress/v1/bills/search.json", {headers: { "X-API-Key": key }});
        // const apiData = await axios.get(
        //     "url": "https://api.propublica.org/congress/v1/bills/search.json",
        //        "key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH"
        console.log(apiData.data);
        res.status(200).json(apiData.data);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
});
​
​
router.get("/zip", async (req, res) => {
    console.log("GET /api/ext/zip");
    try {
        var key = req.body.key;
        console.log(req.body.key);
        console.log("THE URL: " + req.body.url);
        const apiData = await axios.get(req.body.url, {headers: { "X-API-Key": key }});
        // const apiData = await axios.get(
        //     "url": "https://api.propublica.org/congress/v1/bills/search.json",
        //        "key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH"
    
        console.log(apiData.data);
        res.status(200).json(apiData.data);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
});
​
​
​
module.exports = router;