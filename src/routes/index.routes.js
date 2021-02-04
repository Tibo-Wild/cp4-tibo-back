const router = require('express').Router();
const adminRouter = require('./admin.routes.js');
const playersRouter = require('./players.route.js');
const trainerRouter = require ('./trainer.routes.js');

router.use('/admins', adminRouter);
router.use('/players', playersRouter);
router.use('/trainer', trainerRouter);

module.exports = router;