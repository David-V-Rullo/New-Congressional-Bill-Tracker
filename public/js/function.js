var loginButton = $("#login-button")
var homeButton = $("#home-button")
var searchSubmit = $("#search-submit")
var signupButton = $("#signup-button")
var logoutButton = $("#logout-button")


loginButton.click(function (e) {
    window.location.replace('/login')
})

signupButton.click(function (e) {
    window.location.replace('/signup')
})

homeButton.click(function (e) {
    console.log(e)
    window.location.replace('/')
})

searchSubmit.click(function (e) {
    window.location.replace('/default')
})

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
