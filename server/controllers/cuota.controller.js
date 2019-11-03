const Cuota = require('../models/cuota');
const Usuario = require('../models/usuario');
const cuotaCtrl = {};
const fs = require('fs');
const path = require('path');
const Bitacora = require('../models/bitacora');

cuotaCtrl.createCuota = async (req, res) => {
	try{        
        const fCuotas = await Cuota.findOne({casa: req.body.casa, mes: req.body.mes, anio: req.body.anio, tipoCuota: req.body.tipoCuota});
        if (fCuotas != null) return res.status(404).send('Cuota ya existe para esa casa con esa fecha.');

        const cuota = new Cuota();
        cuota.usuario = req.body.usuario;
        cuota.casa = req.body.casa;
        cuota.tipoCuota = req.body.tipoCuota;
        cuota.importe = req.body.importe;
        cuota.fechaAlta = new Date();
        cuota.mes = req.body.mes;
        cuota.anio = req.body.anio;
        cuota.nota = req.body.nota;
        cuota.estado = '1';
    
        var rCuota = await cuota.save();    
        if (!rCuota) return res.status(404).send('Cuota No creada.');

        //Crear bitacora
        const bitacora = new Bitacora();
        bitacora.accion = 'Alta de cuota ' + cuota.anio + '/' + cuota.mes + ' casa: ' + cuota.casa;
        bitacora.fecha = new Date();
        bitacora.estado = '1';
        await bitacora.save();

        res.status(200).send({ success: true, payload: rCuota._id });
    }
    catch(e){
        res.status(404).send("Cuota No creada");
    }
}

cuotaCtrl.createCuotaFile = async (req, res) => {
	try{        
        //const fTipoCuotas = await TipoCuota.findOne({nombre: req.body.nombre});
        //if (fTipoCuotas && fTipoCuotas.nombre == req.body.nombre) return res.status(404).send('Tipo cuota ya existe con ese nombre.');
        
        //Set archivo
        const archivo = {};
        archivo._id = req.file.filename;
        archivo.nombre = req.file.originalname;
        archivo.estado = '1';
        const url = req.file.path.replace(/\\/g,'/');
        archivo.url = url;
        const ext = path.extname(req.file.originalname);
        if(ext.toLowerCase() == '.jpg' || ext.toLowerCase() == '.png' || ext.toLowerCase() == '.jpeg') archivo.tipo = 'img';
        else archivo.tipo = 'doc';

        //Set cuota
        const cuota = new Cuota();
        cuota.usuario = req.body.usuario;
        cuota.casa = req.body.casa;
        cuota.tipoCuota = req.body.tipoCuota;
        cuota.importe = Number(req.body.importe);
        cuota.fechaAlta = new Date();
        cuota.mes = Number(req.body.mes);
        cuota.anio = Number(req.body.anio);
        cuota.nota = req.body.nota;
        cuota.archivos = new Array();
        cuota.archivos.push(archivo);
        cuota.estado = '1';
    
        var rCuota = await cuota.save();    
        if (!rCuota) return res.status(404).send('Cuota No creada.');
        
        //Crear bitacora
        const bitacora = new Bitacora();
        bitacora.accion = 'Alta de cuota ' + cuota.anio + '/' + cuota.mes + ' casa: ' + cuota.casa;
        bitacora.fecha = new Date();
        bitacora.estado = '1';
        await bitacora.save();

        res.status(200).send({ success: true, payload: rCuota });
    }
    catch(e){
        res.status(404).send("Cuota No creada");
    }
}

cuotaCtrl.getCuotas = async(req, res) => {
	try{
        var anio = Number(req.query.anio);
        var mI = Number(req.query.mI);
        var mF = Number(req.query.mF);
        var tipos = req.query.tipos.split('@');

        var rCuota = await Cuota.find({anio: anio, estado: '1'})
        .where('mes').gte(mI).lte(mF)
        .where('tipoCuota').in(tipos)
        .select('usuario casa mes anio tipoCuota importe fechaAlta estado')
        .sort('casa');

        if (!rCuota) return res.status(404).send('Cuotas no encontradas.');
        res.status(200).send({ success: true, payload: rCuota });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

cuotaCtrl.getCuota = async (req, res) => {
	try{
        const rCuota = await Cuota.findById(req.params.id,{ estado: 0, __v: 0 });
        if (!rCuota) return res.status(404).send('Cuota no encontrada.');
        res.status(200).send({ success: true, payload: rCuota });
    }
    catch(e){
        res.status(404).send("Cuota No encontrada");
    } 
}

cuotaCtrl.editCuota = async (req, res) => {
	try{
        const { id } = req.params;
        const cuota = {
            casa: req.body.casa,
            tipoCuota: req.body.tipoCuota,
            importe: req.body.importe,
            mes: req.body.mes,
            anio: req.body.anio,
            nota: req.body.nota,
        };
    
        var rCuota = await Cuota.findByIdAndUpdate(id, {$set: cuota}, {new : true});
        if (!rCuota) return res.status(404).send('Cuota no actualizada.');
        res.status(200).send({ success: true, payload: rCuota._id });
    }
    catch(e){
        res.status(404).send("Cuota No actualizada");
    }
}

cuotaCtrl.editCuotaImporte = async (req, res) => {
	try{
        const { id } = req.params;
        const cuota = {
            importe: req.body.importe
        };
    
        var rCuota = await Cuota.findByIdAndUpdate(id, {$set: cuota}, {new : true});
        if (!rCuota) return res.status(404).send('Cuota no actualizada.');
        res.status(200).send({ success: true, payload: rCuota._id });
    }
    catch(e){
        res.status(404).send("Cuota No actualizada");
    }
}

cuotaCtrl.deleteCuota = async (req, res) => {
	try{
        var rCuota = await Cuota.findByIdAndRemove(req.params.id);
        if (!rCuota) return res.status(404).send('Cuota no eliminada.');
        
        //Crear bitacora
        const bitacora = new Bitacora();
        bitacora.accion = 'Eliminación de cuota ' + rCuota.anio + '/' + rCuota.mes + ' casa: ' + rCuota.casa;
        bitacora.fecha = new Date();
        bitacora.estado = '1';
        await bitacora.save();

        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Cuota No eliminada");
    }
}

cuotaCtrl.eliminarArchivoCuota = async (req, res) => {
	try{
        var id = req.body._id;
        var archivo = req.body.archivoId;        
        var url = 'public/uploads/cuotas/';

        // delete file named 'sample.txt'
        fs.unlink(url + archivo, function (err) {
            if (err) res.status(404).send("Cuota No eliminada");
        }); 

        var rCuota = await Cuota.findByIdAndUpdate(id, { $pull: { 'archivos': {  _id: archivo } } }, {new : true});

        if (!rCuota) return res.status(404).send('Archivo Cuota no eliminado.');
        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Cuota No eliminada");
    }
}

cuotaCtrl.agregarCuotaFile = async (req, res) => {
	try{        
        const rCuota = await Cuota.findById(req.body.cuota);
        if (!rCuota) return res.status(404).send('Cuota no encontrada.');
        
        if(rCuota.archivos == null || rCuota.archivos.length == 0) rCuota.archivos = new Array();
        var archivos = req.files;
        for(let i = 0; i < archivos.length; i++){        
            //Set archivo
            const archivo = {};
            archivo._id = archivos[i].filename;
            archivo.nombre = archivos[i].originalname;
            archivo.estado = '1';
            const url = archivos[i].path.replace(/\\/g,'/');
            archivo.url = url;
            const ext = path.extname(archivos[i].originalname);
            if(ext.toLowerCase() == '.jpg' || ext.toLowerCase() == '.png' || ext.toLowerCase() == '.jpeg') archivo.tipo = 'img';
            else archivo.tipo = 'doc';
            rCuota.archivos.push(archivo);
        }
    
        var sCuota = await rCuota.save();    
        if (!sCuota) return res.status(404).send('Archivos de cuotas no creados.');
        res.status(200).send({ success: true, payload: sCuota });
    }
    catch(e){
        res.status(404).send("Archivos de cuotas no creados");
    }
}

cuotaCtrl.getCuotasFaltantes = async(req, res) => {
    try{
        var anio = Number(req.query.anio);
        var mes = Number(req.query.mes);
        var tipo = req.query.tipo;
        
        fUsuarios = await Usuario.find({"estado": "1" })
        .select('user casa')
        .sort('-casa');
        if (!fUsuarios) return res.status(404).send('Usuarios no encontrados.');

        var rCuota = await Cuota.find({anio: anio, mes: mes, tipoCuota: tipo, estado: '1'});
        //.select('usuario casa mes anio tipoCuota importe estado')
        //.sort('casa');

        if (!rCuota) return res.status(404).send('Cuotas no encontradas.');

        res.status(200).send({ success: true, payload: {casas: fUsuarios, cuotas: rCuota} });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}


module.exports = cuotaCtrl;