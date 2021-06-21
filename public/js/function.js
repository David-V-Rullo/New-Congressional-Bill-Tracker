var loginButton = $("#login-button")
var homeButton = $("#home-button")
var searchSubmit = $("#search-submit")
var signupButton = $("#signup-button")
var logoutButton = $("#logout-button")

//Login navigation function
loginButton.click(function (e) {
    window.location.replace('/login')
})

//Signup navigation function
signupButton.click(function (e) {
    window.location.replace('/signup')
})

//Home navigation function
homeButton.click(function (e) {
    console.log(e)
    window.location.replace('/')
})

//Displays search results
searchSubmit.click(function (e) {
    window.location.replace('/default')
})

//Logout button function
logoutButton.click(function (e) {
    fetch("/api/user/logout")
        .then(data => {
            console.log("Logged Out");
            window.location.replace("/");
            
        })
        .catch(err => {
            console.log("Failed to log out");
        });
})
