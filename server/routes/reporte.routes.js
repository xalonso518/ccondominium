const express = require('express');
const router = express.Router();
var VerifyToken  = require('../includes/verifyToken');
var VerifyTokenAdmin  = require('../includes/verifyTokenAdmin');
const reporteCtrl = require('../controllers/reporte.controller');

router.get('/anual', VerifyToken, reporteCtrl.getReporte);

module.exports = router;