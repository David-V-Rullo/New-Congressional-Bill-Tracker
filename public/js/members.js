

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user/user_data").then(data => {
    $(".member-name").text(data.name);
  });
});

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user/user_data").then(data => {
      $("#member-name").text(data.name);
  });
});

$.get("/api/user/user_data")




//get user data in order to return congressmen
var saveZip;
var congUrl;
var userZip;
var useZip;
var yourZip;
var userId;
var userName;

// Loads document and then grabs user data from the database - to get the zip and concatenate out the API with the correct zipcode

$(document).ready(() => {

  userZip = $.get("/api/user/user_data").then(data => {

      userZip = JSON.stringify(data.zip);
      userId = JSON.stringify(data.id)
      console.log(userId)
      console.log(congUrl)
      var userName = JSON.stringify(data.name)
      console.log(userName)


      var congUrl = userZip

      yourZip = userZip.replace(/"([^"]+(?="))"/g, '$1');
      saveZip = ("https://whoismyrepresentative.com/getall_mems.php?zip=" + yourZip + "&output=json");
      console.log(saveZip)


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
  secondCongName = content.results[1].name
  secondCongParty = content.results[1].party
  secondCongLink = content.results[1].link
  thirdCongName = content.results[2].name
  thirdCongParty = content.results[2].party
  thirdCongLink = content.results[2].link

  console.log(content);


  $("#rep-one-name").text(firstCongName);
  $("#rep-one-party").text(firstCongParty);
  $("#rep-one-link").text(firstCongLink);

  $("#rep-two-name").text(secondCongName);
  $("#rep-two-party").text(secondCongParty);
  $("#rep-two-link").text(secondCongLink);

  $("#rep-three-name").text(thirdCongName);
  $("#rep-three-party").text(thirdCongParty);
  $("#rep-three-link").text(thirdCongLink);
  
  $("#rep-one-link").css("fontSize", 12);
  $("#rep-two-link").css("fontSize", 12);
  $("#rep-three-link").css("fontSize", 12);
  

};

