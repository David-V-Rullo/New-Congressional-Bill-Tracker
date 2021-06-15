
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
            

        })
}

