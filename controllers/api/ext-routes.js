const router = require("express").Router();
const passport = require("../../config/passport");
const axios = require('axios');


// {
// 	"url": "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc",
//   "key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH"
// }

router.get("/propublica", async (req, res) => {
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
        //res.status(200).json(apiData);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
});



module.exports = router;
