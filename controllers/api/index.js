const router = require('express').Router();
const userRoute = require('./userRoute');
const commentRoute = require('./commentRoute');
const postRoute = require('./postRoute');

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

module.exports = router;