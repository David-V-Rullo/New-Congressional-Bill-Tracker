module.exports = async function() {
   var key = "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH";
   const axios = require('axios') 
   const results = await axios.get("https://api.propublica.org/congress/v1/bills/search.json", {headers: { "X-API-Key": key }});
   console.log(results)
   return results
}