const Bitacora = require('../models/bitacora');
const bitacoraCtrl = {};
const fs = require('fs');
const path = require('path');

bitacoraCtrl.getBitacoras = async(req, res) => {
	try{
        var fechaInicio = new Date(req.query.fechaInicio);
        var fechaFinal = new Date(req.query.fechaFinal);

        var rBitacoras = await Bitacora.find({fecha: { '$gte': fechaInicio, '$lte': fechaFinal }});
        if (!rBitacoras) return res.status(404).send('Bitacoras no encontradas.');
        res.status(200).send({ success: true, payload: rBitacoras });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

module.exports = bitacoraCtrl;