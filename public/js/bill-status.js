//Global Variables
var pastWeekSearch = false;
var pastMonthSearch = false;
var currentCongSearch = false;
var billIdEl = $("#bill-id");
var billTitleEl = $("#bill-title");
var billSponEl = $("#sponsor");
var billSponNameEl = $("#sponsor-name");
var billSponTitleEl = $("#sponsor-title");
var billSponPartyEl = $("#sponsor-party");
var billCommEl = $("#committee");
var billTextEl = $("#bill-text");
var billLongTitle = $("#bill-long-title");
var introducedDateEl = $("#introduced");

// Modal variables
var modalSponTitle = $("#rep-title");
var modalSponName = $("#rep-name");
var modalSponParty = $("#rep-party");
var modalSponBio = $("#rep-bio");
var modalSponCap = $("#spon-image-caption");

// Clark Code Vars
var billByDateTextEl = document.getElementById("bill-text");
var billNewest = {};
var dateBillOutput = {};
var dateBillData;
var billKeyTextEl = document.getElementById("bill-text"); //bill data destination
var userSearch;
var billKeyOutput = {};
var billKeyData;
var topics = document.getElementById("topic");
var billOutput = {};
var billData;

//Patrick Code Vars
var searchBtn = $(".search-submit");
var previousBtn = $("#previous");
var nextBtn = $("#next");
var moreNextBtn = $("#moreNext");
var morePreviousBtn = $("#morePrevious");
var pastWeekBtn = $("#week-search");
var pastMonthBtn = $("#month-search");
var inputTextEl = $("#input-text");

//Element selectors
var dateSearchResultsEl = $("#date-search-results");
var pageNumEl = $("#page-number");
var dateSearchEl = $("#date-search-section");
var currentBtn = $("#congress-search");
var topicsEl = $("#topic");

//Date variables
var currentCongress = moment().startOf("year").format("YYYY-MM-DD");
var oneWeek = moment().subtract(7, "days").format("YYYY-MM-DD");
var oneMonth = moment().subtract(1, "months").format("YYYY-MM-DD");

//state variables
var offset = 0;
var date;

// Working Code for selector buttons on side bar. Only allows user to pick one and populate the boolean for what they want. This boolean is referenced when the search function exectues.

$("#month-search").on("click", function () {
  pastMonthSearch = true;
  if (pastWeekSearch === true || currentCongSearch === true) {
    currentCongSearch = false;
    pastWeekSearch = false;
  }
  console.log("Month search is: " + pastMonthSearch);
  console.log("Week search is: " + pastWeekSearch);
  console.log("Congress search is: " + currentCongSearch);
  console.log($(this).attr("id"));
});
$("#week-search").on("click", function () {
  pastWeekSearch = true;
  if (pastMonthSearch === true || currentCongSearch === true) {
    currentCongSearch = false;
    pastMonthSearch = false;
  }
  console.log("Month search is: " + pastMonthSearch);
  console.log("Week search is: " + pastWeekSearch);
  console.log("Congress search is: " + currentCongSearch);
  console.log($(this).attr("id"));
});
$("#congress-search").on("click", function () {
  currentCongSearch = true;
  if (pastMonthSearch === true || pastWeekSearch === true) {
    pastWeekSearch = false;
    pastMonthSearch = false;
  }
  console.log("Month search is: " + pastMonthSearch);
  console.log("Week search is: " + pastWeekSearch);
  console.log("Congress search is: " + currentCongSearch);
  console.log($(this).attr("id"));
});

// Renders the bill status this should be called in all search functions and initial bill on load.
//  If the status code matches the button ID, light that button. //   All buttons should have default of grey.
function renderBillStatus(billData) {
  //  $(".status-button").each(function () {
  if (billData.house_passage === null && billData.senate_passage === null) {
    $("#introduced").addClass("active-status");
    $("#introduced").removeClass("inactive-status");
    return;
  }
  if (billData.house_passage !== null && billData.senate_passage === null) {
    $("#pass-house").addClass("active-status");
    $("#pass-house").removeClass("inactive-status");
    return;
  }
  if (billData.senate_passage !== null) {
    $("#pass-senate").addClass("active-status");
    $("#pass-senate").removeClass("inactive-status");
    return;
  }
  if (billData.active !== false) {
    $("#became-law").addClass("active-status");
    $("#became-law").removeClass("inactive-status");
    return;
  }
}

//FUNCTION TO SEARCH BILLS BY DATE

function billsByDate(date = currentCongress) {
  dateSearchResultsEl.empty();
  dateSearchEl.show();
  pageNumEl.text(offset / 20 + 1);

  var url;
  if (topicsEl.val() === "Select a Topic") {
    url =
      "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc&offset=" +
      offset;
      if(inputTextEl.val()){
        var topic = inputTextEl.val();
        url =
        "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc" +
        "&offset=" +
        offset +
        "&query=" +
        encodeURIComponent(topic);
      }
  } else {
    var topic = topicsEl.val();
    console.log(topic);
    url =
      "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc" +
      "&offset=" +
      offset +
      "&query=" +
      encodeURIComponent(topic);

      if(inputTextEl.val()){
        var topic = inputTextEl.val();
        url =
        "https://api.propublica.org/congress/v1/bills/search.json?sort=date&dir=desc" +
        "&offset=" +
        offset +
        "&query=" +
        encodeURIComponent(topic);
      }
  }
  console.log(url);
  fetch(url, {
    headers: { "X-API-Key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH" },
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (response) {
      var bills = response.results[0].bills;
      console.log(bills);
      for (i = 0; i < bills.length; i++) {
        if (moment(bills[i].latest_major_action_date).isAfter(date)) {
          //Creates a card for each result
          var searchCard = $("<div>").attr("class", "bill-card");
          var cardHead = $("<h4>").append(
            $("<strong>").text(bills[i].bill_id.toUpperCase())
          );
          searchCard.append(cardHead);
          var cardList = $("<ul>");
          var liOne = $("<li>")
            .text("Sponsor: ")
            .append(
              $("<span>").attr("id", "sponsor").text(bills[i].sponsor_name)
            );
          var liTwo = $("<li>")
            .text("Comittees: ")
            .append($("<span>").text(bills[i].committees));
          var liThree = $("<li>").append($("<p>").text(bills[i].title));
          cardList.append(liOne, liTwo, liThree);
          searchCard.append(cardList);
          var statusBoxes = $("<div>").attr("class", "bill-status");
          var boxOne = $("<button>")
            .attr("class", "status-button inactive-status")
            .text("Introduced");
          var boxTwo = $("<button>")
            .attr("class", "status-button inactive-status")
            .text("Passed House");
          var boxThree = $("<button>")
            .attr("class", "status-button inactive-status")
            .text("Passed Senate");
          var boxFour = $("<button>")
            .attr("class", "status-button inactive-status")
            .text("Became Law");

          if (
            bills[i].house_passage === null &&
            bills[i].senate_passage === null
          ) {
            boxOne.addClass("active-status");
            boxOne.removeClass("inactive-status");
          }
          if (
            bills[i].house_passage !== null &&
            bills[i].senate_passage === null
          ) {
            boxTwo.addClass("active-status");
            boxTwo.removeClass("inactive-status");
          }
          if (bills[i].senate_passage !== null) {
            boxThree.addClass("active-status");
            boxThree.removeClass("inactive-status");
          }
          if (bills[i].enacted !== null) {
            boxFour.addClass("active-status");
            boxFour.removeClass("inactive-status");
          }

          statusBoxes.append(boxOne, boxTwo, boxThree, boxFour);
          searchCard.append(statusBoxes);
          dateSearchResultsEl.append(searchCard);
        }
      }
    });
}

// dateSearchEl.hide();
searchBtn.on("click", function (e) {
  offset = 0;
  console.log(e);
  billsByDate();
});

nextBtn.on("click", function () {
  offset += 20;
  billsByDate();
});

previousBtn.on("click", function () {
  if (offset >= 20) {
    offset -= 20;
    billsByDate();
  }
});

//Default get latest Bill

function getLatestBill() {
  var url = "https://api.propublica.org/congress/v1/bills/search.json";
  fetch(url, {
    headers: { "X-API-Key": "jHHlm068RlyEusHIX91YA9zmZrvEtDyGplugF6tH" },
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (locRes) {
      billOutput = JSON.stringify(locRes);
      billData = JSON.parse(billOutput);
      console.log(billData);
      billNewest = billData.results[0].bills[0];
      console.log(billNewest);

      billIdEl.text(billNewest.bill_id.toUpperCase());
      billSponNameEl.text(billNewest.sponsor_name);
      billSponTitleEl.text(billNewest.sponsor_title);
      billSponPartyEl.text(
        ` (${billNewest.sponsor_party} - ${billNewest.sponsor_state})`
      );

      //Bill Card population
      billCommEl.text(billNewest.committees);
      billTitleEl.text(billNewest.short_title);
      billLongTitle.text(billNewest.title);

      //Modal Population
      modalSponName.text(
        `${billNewest.sponsor_title} ${billNewest.sponsor_name}`
      );
      modalSponParty.text(
        `(${billNewest.sponsor_party} - ${billNewest.sponsor_state})`
      );
      modalSponCap.text(
        `${billNewest.sponsor_title} ${billNewest.sponsor_name}`
      );
      //Status Bar Changes
      introducedDateEl.text(`Introduced: ${billNewest.introduced_date}`);

      renderBillStatus(billNewest);
    });
}
// When the user clicks on the button, open the modal
// When the user clicks on <span> (x), close the modal

$(".close").on("click", function (e) {
  console.log(e);
  document.getElementById("myModal").style.display = "none";
});

//Click event for populating modal with image and summary
billSponEl.click(function (e) {
  console.log(e);
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var wikiEndpointExtract =
    "https://en.wikipedia.org/api/rest_v1/page/summary/";
  var congressExtract;
  var congressPic;
  var congressPerson = billSponNameEl.text();
  congressPerson = congressPerson.split(" ");
  congressPerson = congressPerson.join("_");
  console.log(congressPerson);

  // CongressImg contains the output of this function and works properly at the moment.
  function getCongressExtract() {
    fetch(wikiEndpointExtract + congressPerson + "?redirect=true")
      .then(function (responseExtract) {
        return responseExtract.json();
      })
      .then(function (responseExtract) {
        console.log("testing");
        console.log(responseExtract);
        //returns summary of wiki page
        congressExtract = responseExtract.extract;
        //gives url link to official photo
        congressPic = responseExtract.originalimage.source;
        //Gives state/title if they have one (ex. senate majority leader, etc)
        $("#rep-bio").text(congressExtract);
        $("#modal-image").attr("src", congressPic);
      });
  }
  getCongressExtract();
});
getLatestBill();
