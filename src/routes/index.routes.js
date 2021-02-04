const router = require('express').Router();
const adminRouter = require('./admin.routes.js');
const playersRouter = require('./players.route.js');
const trainerRouter = require ('./trainer.routes.js');
const nextRouter = require ('./next.routes.js');
const previousRouter = require('./previous.route.js');

router.use('/admins', adminRouter);
router.use('/players', playersRouter);
router.use('/trainer', trainerRouter);
router.use('/next', nextRouter);
router.use('/previous', previousRouter);

module.exports = router;