const express = require('express');

const router = express.Router();

/* Services */
const authController = require('../controller/authController');
const statsController = require('../controller/statsController');
const stockController = require('../controller/stockController');

const checkToken = require('../middleware/checkToken');
const checkRoleAuth = require('../middleware/checkRoleAuth');

/* API's Health */
router.get('/', (req, res) => {
  res.status(200).json({ status: 'api service is up and running' });
});

/** ***** Auth ****** */
router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/reset', authController.reset);

/** ***** Stock ****** */
router.get('/stocks', checkToken, stockController.getStock);
router.get('/stocks/history', checkToken, stockController.getHistory);

/** ***** Stats ****** */
router.get('/stats', checkToken, checkRoleAuth('admin'), statsController.getStats);

module.exports = router;
