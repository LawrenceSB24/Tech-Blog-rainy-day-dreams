const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoute = require('./dashboardRoute');
const homepageRoute = require('./homepageRoute');

router.use('/api',apiRoutes);
router.use('/', homepageRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;