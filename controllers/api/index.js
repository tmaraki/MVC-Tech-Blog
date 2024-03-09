const router = require('express').Router();

// Import routes
const userRoutes = require('./userRoutes');

// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
router.use('/users', userRoutes);

module.exports = router;
