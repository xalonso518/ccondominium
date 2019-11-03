const express = require('express');
const router = express.Router();
var VerifyToken  = require('../includes/verifyToken');
var VerifyTokenAdmin  = require('../includes/verifyTokenAdmin');
const tipoCumplimientoCtrl = require('../controllers/tipoCumplimiento.controller');

router.get('/list', VerifyToken, tipoCumplimientoCtrl.getTiposCumplimiento);
router.get('/list/todos', VerifyToken, tipoCumplimientoCtrl.getTiposCumplimientoTodos);
router.get('/:id', VerifyToken, tipoCumplimientoCtrl.getTipoCumplimiento);
router.post('/', VerifyTokenAdmin,tipoCumplimientoCtrl.createTipoCumplimiento);
router.put('/:id', VerifyTokenAdmin,tipoCumplimientoCtrl.editTipoCumplimiento);
router.delete('/:id', VerifyTokenAdmin,tipoCumplimientoCtrl.deleteTipoCumplimiento);
router.post('/estado', VerifyTokenAdmin,tipoCumplimientoCtrl.cambiarEstadoTipoCumplimiento);

module.exports = router;