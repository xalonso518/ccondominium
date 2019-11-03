const express = require('express');
const router = express.Router();
var VerifyToken = require('../includes/verifyToken');
const configuracionCtrl = require('../controllers/configuracion.controller');

router.post('/', VerifyToken, configuracionCtrl.getConfiguracion);

module.exports = router;