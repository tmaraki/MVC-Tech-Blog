const router = require('express').Router();

// Import routes
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');

// When a request is made to the /users or /blogposts path, it will be directed to the index.js in the /users or /projects folder.
router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);

module.exports = router;
