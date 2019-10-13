const express = require('express');
const router = express.Router();
var VerifyToken = require('../includes/verifyToken');
const configCtrl = require('../controllers/config.controller');

router.post('/', VerifyToken, configCtrl.getConfig);

module.exports = router;