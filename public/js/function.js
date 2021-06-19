var loginButton = $("#login-button")
var homeButton = $("#home-button")
var searchSubmit = $("#search-submit")
var signupButton = $("#signup-button")


loginButton.click(function(e){
    window.location.replace('/login')
})

signupButton.click(function(e){
    window.location.replace('/signup')
})

homeButton.click(function(e) {
    console.log(e)
    window.location.replace('/') })

searchSubmit.click(function(e) {
    window.location.replace('/default')
})
