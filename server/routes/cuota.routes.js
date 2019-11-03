const express = require('express');
const router = express.Router();
var VerifyToken  = require('../includes/verifyToken');
var VerifyTokenAdmin  = require('../includes/verifyTokenAdmin');
const cuotaCtrl = require('../controllers/cuota.controller');
var uploadFileCuota = require('../includes/handleFileCuota');
var uploadMultipleFileCuota = require('../includes/handleMultipleFileCuota');

router.get('/list', VerifyToken, cuotaCtrl.getCuotas);
router.get('/faltantes', VerifyToken, cuotaCtrl.getCuotasFaltantes);
router.put('/editarImporte/:id', VerifyTokenAdmin,cuotaCtrl.editCuotaImporte);
router.get('/:id', VerifyToken, cuotaCtrl.getCuota);
router.post('/postFile', uploadFileCuota.single('file'), cuotaCtrl.createCuotaFile);
router.post('/', VerifyToken, cuotaCtrl.createCuota);
router.put('/:id', VerifyTokenAdmin,cuotaCtrl.editCuota);
router.delete('/:id', VerifyTokenAdmin,cuotaCtrl.deleteCuota);
router.post('/archivo/eliminar', VerifyToken, cuotaCtrl.eliminarArchivoCuota);
router.post('/archivo', uploadMultipleFileCuota.array('files', 5), cuotaCtrl.agregarCuotaFile);

module.exports = router;