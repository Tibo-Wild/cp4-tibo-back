const router = require('express').Router();
const adminRouter = require('./admin.routes.js');
const playersRouter = require('./players.route.js');

router.use('/admins', adminRouter);
router.use('/players', playersRouter);

module.exports = router;