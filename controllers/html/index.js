const router = require('express').Router();

const htmlRoutes = require('./html-routes');

router.use(htmlRoutes);

module.exports = router;
