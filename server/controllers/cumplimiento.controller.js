const Cumplimiento = require('../models/cumplimiento');
const cumplimientoCtrl = {};
const fs = require('fs');
const path = require('path');
const Bitacora = require('../models/bitacora');

cumplimientoCtrl.createCumplimiento = async (req, res) => {
	try{        
        //const fTipoCumplimientos = await TipoCumplimiento.findOne({nombre: req.body.nombre});
        //if (fTipoCumplimientos && fTipoCumplimientos.nombre == req.body.nombre) return res.status(404).send('Tipo cumplimiento ya existe con ese nombre.');

        const cumplimiento = new Cumplimiento();
        cumplimiento.usuario = req.body.usuario;
        cumplimiento.casa = req.body.casa;
        cumplimiento.tipoCumplimiento = req.body.tipoCumplimiento;
        cumplimiento.importe = req.body.importe;
        cumplimiento.nivel = req.body.nivel;
        cumplimiento.fechaAlta = new Date();
        cumplimiento.mes = req.body.mes;
        cumplimiento.anio = req.body.anio;
        cumplimiento.nota = req.body.nota;
        cumplimiento.estado = '1';
    
        var rCumplimiento = await cumplimiento.save();    
        if (!rCumplimiento) return res.status(404).send('Cumplimiento No creado.');
        
        //Crear bitacora
        const bitacora = new Bitacora();
        bitacora.accion = 'Alta de cumplimiento ' + cumplimiento.anio + '/' + cumplimiento.mes + ' casa: ' + cumplimiento.casa;
        bitacora.fecha = new Date();
        bitacora.estado = '1';
        await bitacora.save();

        res.status(200).send({ success: true, payload: rCumplimiento._id });
    }
    catch(e){
        res.status(404).send("Tipo cumplimiento No creado");
    }
}

cumplimientoCtrl.getCumplimientos = async(req, res) => {
	try{
        var anio = Number(req.query.anio);
        var mes = Number(req.query.mes);
        var tipo = req.query.tipo;

        var rCumplimiento = await Cumplimiento.find({anio: anio, mes: mes, tipoCumplimiento: tipo, estado: '1'});
        if (!rCumplimiento) return res.status(404).send('Cumplimientos no encontradas.');
        res.status(200).send({ success: true, payload: rCumplimiento });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

cumplimientoCtrl.getCumplimiento = async (req, res) => {
	try{
        const rCumplimiento = await Cumplimiento.findById(req.params.id,{ estado: 0, __v: 0 });
        if (!rCumplimiento) return res.status(404).send('Cumplimiento no encontrada.');
        res.status(200).send({ success: true, payload: rCumplimiento });
    }
    catch(e){
        res.status(404).send("Cumplimiento No encontrada");
    } 
}

cumplimientoCtrl.editCumplimiento = async (req, res) => {
	try{
        const { id } = req.params;
        const cumplimiento = {
            casa: req.body.casa,
            tipoCumplimiento: req.body.tipoCumplimiento,
            importe: req.body.importe,
            nivel: req.body.nivel,
            mes: req.body.mes,
            anio: req.body.anio,
            nota: req.body.nota,
        };
    
        var rCumplimiento = await Cumplimiento.findByIdAndUpdate(id, {$set: cumplimiento}, {new : true});
        if (!rCumplimiento) return res.status(404).send('Cumplimiento no actualizada.');
        res.status(200).send({ success: true, payload: rCumplimiento._id });
    }
    catch(e){
        res.status(404).send("Cumplimiento No actualizada");
    }
}

cumplimientoCtrl.deleteCumplimiento = async (req, res) => {
	try{
        var rCumplimiento = await Cumplimiento.findByIdAndRemove(req.params.id);
        if (!rCumplimiento) return res.status(404).send('Cumplimiento no eliminada.');

        //Crear bitacora
        const bitacora = new Bitacora();
        bitacora.accion = 'Eliminación de cumplimiento ' + rCumplimiento.anio + '/' + rCumplimiento.mes + ' casa: ' + rCumplimiento.casa;
        bitacora.fecha = new Date();
        bitacora.estado = '1';
        await bitacora.save();

        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Cumplimiento No eliminada");
    }
}

module.exports = cumplimientoCtrl;