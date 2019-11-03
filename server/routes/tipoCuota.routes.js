const express = require('express');
const router = express.Router();
var VerifyToken  = require('../includes/verifyToken');
var VerifyTokenAdmin  = require('../includes/verifyTokenAdmin');
const tipoCuotaCtrl = require('../controllers/tipoCuota.controller');

router.get('/list/todos', VerifyToken, tipoCuotaCtrl.getTiposCuotaTodos);
router.get('/list', VerifyToken, tipoCuotaCtrl.getTiposCuota);
router.get('/:id', VerifyToken, tipoCuotaCtrl.getTipoCuota);
router.post('/', VerifyTokenAdmin,tipoCuotaCtrl.createTipoCuota);
router.put('/:id', VerifyTokenAdmin,tipoCuotaCtrl.editTipoCuota);
router.delete('/:id', VerifyTokenAdmin,tipoCuotaCtrl.deleteTipoCuota);
router.post('/estado', VerifyTokenAdmin,tipoCuotaCtrl.cambiarEstadoTipoCuota);

module.exports = router;