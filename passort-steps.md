# Steps of Integration with PassportJS

1. Installation of NPM packages for passport and passport-local
    * npm install passport passport-local
2. Create data models
3. Create passport.js to configure the local strategy with the user model.
4. Create middleware, isAuthenticated, for checking user's signin status and re-routes
5. Create express routes
    * API Routes
        * POST /api/signup
        * POST /api/login
        * GET /api/user_data - this is to pass the user data from req.user to the front end pages needed to display "Welcome, ##Joe##"
        * Other GET or POST api routes your app needs, which interact with database
    * HTML Routes
        * GET / - for your landing page
        * GET /login
        * GET /YOUR-MAIN-APP-PAGE  -  using isAuthenticated middleware to protect the page. You can several web page resources using GET /YOUR-OTHER-WEB-PAGE



