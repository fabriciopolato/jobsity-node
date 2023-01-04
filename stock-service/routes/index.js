const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ status: 'stock service is up and running' });
});

router.get('/stocks', stockController.getStock);

module.exports = router;
