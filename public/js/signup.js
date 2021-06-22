$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("#signup-submit");
  const nameInput = $("#name-signup");
  const emailInput = $("#email-signup");
  const passwordInput = $("#password-signup");
  const zipcode = $("#zipcode-signup");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", event => {
    event.preventDefault();
    const userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),

      zipcode: zipcode.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.zipcode, userData.password);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    zipcode.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, zip, password) {
    $.post("/api/user/signup", {
      name: name,
      email: email,
      zip: zip,
      password: password
    })
      .then(data => {
        console.log("signUpUser", data);
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log("signup - handleLoginErr")
    $("#alert .msg").text(err.message);
    $("#alert").fadeIn(500, function() {
      location.reload();
    });
  }
});
