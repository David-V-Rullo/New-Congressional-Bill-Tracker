const router = require('express').Router();

const userRoutes = require('./user-routes');
const extRoutes  = require('./ext-routes');

// API routes for user
router.use("/user", userRoutes);
//External api routes
router.use("/ext", extRoutes);

module.exports = router;