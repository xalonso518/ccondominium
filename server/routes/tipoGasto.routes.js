const express = require('express');
const router = express.Router();
var VerifyToken  = require('../includes/verifyToken');
var VerifyTokenAdmin  = require('../includes/verifyTokenAdmin');
const tipoGastoCtrl = require('../controllers/tipoGasto.controller');

router.get('/list/todos', VerifyToken, tipoGastoCtrl.getTiposGastoTodos);
router.get('/list', VerifyToken, tipoGastoCtrl.getTiposGasto);
router.get('/:id', VerifyToken, tipoGastoCtrl.getTipoGasto);
router.post('/', VerifyTokenAdmin,tipoGastoCtrl.createTipoGasto);
router.put('/:id', VerifyTokenAdmin,tipoGastoCtrl.editTipoGasto);
router.delete('/:id', VerifyTokenAdmin,tipoGastoCtrl.deleteTipoGasto);
router.post('/estado', VerifyTokenAdmin,tipoGastoCtrl.cambiarEstadoTipoGasto);

module.exports = router;