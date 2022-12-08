const express = require('express');
const router = express.Router();
const coinController = require('../controller/coinController');

router.get('/coins', coinController.getCoins);

module.exports = router;
