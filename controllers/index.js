const router = express.Router();

const homeRoutes = require('./homeRoutes');
router.use('/', homeRoutes);

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

const dashboardRoutes = require('./dashboardRoutes');
router.use('/dashboard', dashboardRoutes);

module.exports = router;