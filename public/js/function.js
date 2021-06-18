var loginButton = $("#login-button")
var homeButton = $("#home-button")
var searchSubmit = $("#search-submit")


loginButton.click(function(e){
    window.location.replace('/login')
})

homeButton.click(function(e) {
    console.log(e)
    window.location.replace('/') })

searchSubmit.click(function(e) {
    window.location.replace('/default')
})
