const router = require('express').Router();

const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentsRoutes');

router.use('/user', userRoutes);
router.use('/post', blogPostRoutes);
router.use('/comment', commentRoutes);

module.exports = router;