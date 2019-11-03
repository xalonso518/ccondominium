const Cuota = require('../models/cuota');
const Gasto = require('../models/gasto');
const reporteCtrl = {};

reporteCtrl.getReporte = async(req, res) => {
	try{
        var anio = Number(req.query.anio);

        var rCuota = await Cuota.aggregate([
            { $match : { estado : "1", anio: anio } },
            {
              $group : { _id : {_id: "$tipoCuota", mes: "$mes"}, 'importe':{$sum:'$importe'} }
            }
          ]).exec();
        if (!rCuota) return res.status(404).send('Cuotas no encontradas.');

        var rGasto = await Gasto.aggregate([
            { $match : { estado : "1", anio: anio } },
            {
              $group : { _id : {_id: "$tipoGasto", mes: "$mes"}, 'importe':{$sum:'$importe'} }
            }
          ]).exec();
          if (!rGasto) return res.status(404).send('Gastos no encontrados.');

        res.status(200).send({ success: true, payload: {cuotas: rCuota, gastos: rGasto} });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

module.exports = reporteCtrl;