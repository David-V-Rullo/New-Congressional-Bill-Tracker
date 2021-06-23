

$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user/user_data").then(data => {
        $(".member-name").text(data.name);
    });
});





//get user data in order to return congressmen
var saveZip;
var congUrl;
var userZip;
var useZip;
var yourZip;
var userId;

// Loads document and then grabs user data from the database - to get the zip and concatenate out the API with the correct zipcode

$(document).ready(() => {

    userZip = $.get("/api/user/user_data").then(data => {

        userZip = JSON.stringify(data.zip);
        userId = JSON.stringify(data.id)
        console.log(userId)


        var congUrl = userZip

        yourZip = userZip.replace(/"([^"]+(?="))"/g, '$1');
        saveZip = ("https://whoismyrepresentative.com/getall_mems.php?zip=" + yourZip + "&output=json");


        showCongress()

    });
});



//This has to be a post function because we need the body to contain the URL

async function showCongress() {
    const rawResponse = await fetch('/api/ext/zip', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: saveZip, b: 'Test' })
    });
    const content = await rawResponse.json();
    console.log(rawResponse)
    firstCongName = content.results[0].name
    firstCongParty = content.results[0].party
    console.log(content.results[0].party)
    firstCongLink = content.results[0].link
    secondCongName = content.results[0].name
    secondCongParty = content.results[0].party
    secondCongLink = content.results[0].link
    thirdCongName = content.results[0].name
    thirdCongParty = content.results[0].party
    thirdCongLink = content.results[0].link

    console.log(content);
};



// const favoriteFormHandler = async function (event) {
//     event.preventDefault();

//     const postId = document.querySelector('input[name="post-id"]').value;
//     const body = document.querySelector('textarea[name="comment-body"]').value;

//     if (body) {
//         await fetch('/api/comment', {
//             method: 'POST',
//             body: JSON.stringify({
//                 postId,
//                 body
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         document.location.reload();
//     }
// };


//possible on click event for adding favorite?
//need event listener on buttons - could save text element.value to replace my syntax
async function addFavorite() {


    const rawResponse = await fetch('/api/user/add_favorite', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: savedBill.name,
            bill_id: savedBill.id,
            sponsor_name: savedBill.sponsor_name,
            short_title: savedBill.short_title,
            introduced_date: savedBill.introduced_date,
            house_passage: savedBill.house_passage,
            senate_passage: savedBill.senate_passage,
            user_id: userId

        })
    });

};