module.exports = function(billdata) {

if (bill.house_passage === null && bill.senate_passage === null) {
    $("#introduced").addClass("active-status");
    $("#introduced").removeClass("inactive-status");
    return;
  }
  if (bill.house_passage !== null && bill.senate_passage === null) {
    $("#pass-house").addClass("active-status");
    $("#pass-house").removeClass("inactive-status");
    return;
  }
  if (bill.senate_passage !== null) {
    $("#pass-senate").addClass("active-status");
    $("#pass-senate").removeClass("inactive-status");
    return;
  }
  if (bill.active !== false) {
    $("#became-law").addClass("active-status");
    $("#became-law").removeClass("inactive-status");
    return;
  }}