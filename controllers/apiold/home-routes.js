const express = require("express");
const homeRouter = express.Router()
const axios = require("axios")



homeRouter.get("/home", async(req, res) => {
    try {
        const latestBillAPI = await axios.get("https://api.propublica.org/congress/v1/bills/search.json", 
        {
            headers: {"X-API-Key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH"},
            
        })
        console.log(latestBillAPI)
        
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.headers)
            console.log(err.response.status)
        
        }
        else {
            console.error
        }

    }





})

module.exports = homeRouter;