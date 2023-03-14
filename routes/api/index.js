const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const studentRoutes = require('./usersRoutes');

router.use('/thoughts', courseRoutes);
router.use('/users', usersRoutes);

module.exports = router;