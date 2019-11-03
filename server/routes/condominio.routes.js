const express = require('express');
const router = express.Router();
var VerifyToken  = require('../includes/verifyToken');
var VerifyTokenAdmin  = require('../includes/verifyTokenAdmin');
const bitacoraCtrl = require('../controllers/bitacora.controller');
const condominioCtrl = require('../controllers/condominio.controller');

router.get('/bitacora', VerifyToken, bitacoraCtrl.getBitacoras);
router.get('/mensaje', VerifyTokenAdmin, condominioCtrl.getMensajes);
router.get('/aviso', VerifyToken, condominioCtrl.getAvisos);
router.post('/aviso', VerifyTokenAdmin,condominioCtrl.createAviso);

module.exports = router;