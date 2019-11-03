const express = require('express');
const router = express.Router();
var VerifyToken  = require('../includes/verifyToken');
var VerifyTokenAdmin  = require('../includes/verifyTokenAdmin');
const gastoCtrl = require('../controllers/gasto.controller');
var uploadFileGasto = require('../includes/handleFileGasto');
var uploadMultipleFileGasto = require('../includes/handleMultipleFileGasto');

router.get('/list', VerifyToken, gastoCtrl.getGastos);
router.put('/editarImporte/:id', VerifyTokenAdmin,gastoCtrl.editGastoImporte);
router.get('/:id', VerifyToken, gastoCtrl.getGasto);
router.post('/postFile', uploadFileGasto.single('file'), gastoCtrl.createGastoFile);
router.post('/', VerifyToken, gastoCtrl.createGasto);
router.put('/:id', VerifyTokenAdmin,gastoCtrl.editGasto);
router.delete('/:id', VerifyTokenAdmin,gastoCtrl.deleteGasto);
router.post('/archivo/eliminar', VerifyToken, gastoCtrl.eliminarArchivoGasto);
router.post('/archivo', uploadMultipleFileGasto.array('files', 5), gastoCtrl.agregarGastoFile);

module.exports = router;