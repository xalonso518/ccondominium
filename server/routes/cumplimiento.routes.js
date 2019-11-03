const express = require('express');
const router = express.Router();
var VerifyToken  = require('../includes/verifyToken');
var VerifyTokenAdmin  = require('../includes/verifyTokenAdmin');
const cumplimientoCtrl = require('../controllers/cumplimiento.controller');

router.get('/list', VerifyToken, cumplimientoCtrl.getCumplimientos);
router.get('/:id', VerifyToken, cumplimientoCtrl.getCumplimiento);
router.post('/', VerifyToken, cumplimientoCtrl.createCumplimiento);
router.put('/:id', VerifyTokenAdmin,cumplimientoCtrl.editCumplimiento);
router.delete('/:id', VerifyTokenAdmin,cumplimientoCtrl.deleteCumplimiento);

module.exports = router;