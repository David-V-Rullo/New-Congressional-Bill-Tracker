
//MEMBERS is a script to send the query to get the current user's congressmen

var saveZip;
var congUrl;
var userZip;
var useZip;
var yourZip;

$(document).ready(() => {

  userZip = $.get("/api/user/user_data").then(data => {

      userZip = JSON.stringify(data.zip);

    
      var congUrl = userZip
    
      yourZip = userZip.replace(/"([^"]+(?="))"/g, '$1');
      saveZip = ("https://whoismyrepresentative.com/getall_mems.php?zip=" + yourZip + "&output=json");

     

      
  });
});





async function showCongress() {
  const rawResponse = await fetch('/api/ext/zip', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url: saveZip, b: 'Test'})
  });
  const content = await rawResponse.json();
  firstCongName = results[0].name
  firstCongName = results[0].party
  firstCongName = results[0].link
  secondCongName = results[0].name
  secondCongName = results[0].party
  secondCongName = results[0].link
  thirdCongName = results[0].name
  thirdCongName = results[0].party
  thirdCongName = results[0].link

  console.log(content);
};
