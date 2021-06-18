var loginButton = $("#login-button")
var homeButton = $("#home-button")

loginButton.click(function(e){
    window.location.replace('/login')
})

homeButton.click(function(e) {
    console.log(e)
    window.location.replace('/') })

