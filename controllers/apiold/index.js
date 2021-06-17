const router = require('express').Router();

const userRoutes = require('./user-routes');
const extRoutes  = require('./ext-routes');
const favRoutes = require('./favorites-routes')


const homeRoutes = require('./home-routes');

// Default get latest bill call
router.use("/home", homeRoutes);

// API routes for user
router.use("/user", userRoutes);
//External api routes
router.use("/ext", extRoutes);
//favorite routes
router.use("/fav", favRoutes);

module.exports = router;