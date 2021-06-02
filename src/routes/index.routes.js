const router = require('express').Router();
const adminRouter = require('./admin.routes.js');
const playersRouter = require('./players.route.js');
const trainerRouter = require ('./trainer.routes.js');
const nextRouter = require ('./next.routes.js');
const previousRouter = require('./previous.route.js');
const legendRouter = require ('./legends.routes');
const palmaresRouter = require ('./palmares.routes');

router.use('/admins', adminRouter);
router.use('/players', playersRouter);
router.use('/trainer', trainerRouter);
router.use('/next', nextRouter);
router.use('/previous', previousRouter);
router.use('/legends', legendRouter);
router.use('/palmares', palmaresRouter);

module.exports = router;