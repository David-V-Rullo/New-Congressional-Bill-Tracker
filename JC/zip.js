
var zip = "07071"

//var url = "https://cors-anywhere.herokuapp.com/https://whoismyrepresentative.com/getall_mems.php?zip=31023&output=json";



function getZipRep() {
    var urlBegin = "https://cors-anywhere.herokuapp.com/https://whoismyrepresentative.com/getall_mems.php?zip=";
    var urlEnd = "&output=json"

    var url = urlBegin + zip + urlEnd;
    fetch(url, {
        headers: { "Access-Control-Allow-Origin" : "*" },
        
        
    })
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log(JSON.stringify(locRes))
            
            // billOutput=(JSON.stringify(locRes))
            // console.log(Object.keys(locRes))
            // console.log(JSON.parse(billOutput))
            // billData=(JSON.parse(billOutput))
            // //BILL ID FOR NEWEST BILL
            // billNewestId=billData.results[0].bills[0].bill_id;
            // //Bill Sponsor Newest Bill
            // billNewestSponsor=billData.results[0].bills[0].sponsor_name;
            // //Bill Title Newest
            // billNewestTitle=billData.results[0].bills[0].short_title;

            // //need text elements for all 3 above
            // billTextEl.innerText=billNewestId;
        })
}

