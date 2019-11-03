const Gasto = require('../models/gasto');
const gastoCtrl = {};
const fs = require('fs');
const path = require('path');
const Bitacora = require('../models/bitacora');

gastoCtrl.createGasto = async (req, res) => {
	try{        
        const fGasto = await Gasto.findOne({casa: req.body.casa, mes: req.body.mes, anio: req.body.anio, tipoGasto: req.body.tipoGasto});
        if (fGasto != null) return res.status(404).send('Gasto ya existe para esa casa con esa fecha.');

        const gasto = new Gasto();
        gasto.usuario = req.body.usuario;
        gasto.tipoGasto = req.body.tipoGasto;
        gasto.importe = req.body.importe;
        gasto.fechaAlta = new Date();
        gasto.mes = req.body.mes;
        gasto.anio = req.body.anio;
        gasto.nota = req.body.nota;
        gasto.estado = '1';
    
        var rGasto = await gasto.save();    
        if (!rGasto) return res.status(404).send('Gasto No creado.');

        //Crear bitacora
        const bitacora = new Bitacora();
        bitacora.accion = 'Alta de gasto ' + gasto.anio + '/' + gasto.mes + ' casa: ' + gasto.casa;
        bitacora.fecha = new Date();
        bitacora.estado = '1';
        await bitacora.save();   

        res.status(200).send({ success: true, payload: rGasto._id });
    }
    catch(e){
        res.status(404).send("Tipo Gasto No creado");
    }
}

gastoCtrl.createGastoFile = async (req, res) => {
	try{        
        //const fTipoGastos = await TipoGasto.findOne({nombre: req.body.nombre});
        //if (fTipoGastos && fTipoGastos.nombre == req.body.nombre) return res.status(404).send('Tipo Gasto ya existe con ese nombre.');
        
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

        //Set Gasto
        const gasto = new Gasto();
        gasto.usuario = req.body.usuario;
        gasto.tipoGasto = req.body.tipoGasto;
        gasto.importe = Number(req.body.importe);
        gasto.fechaAlta = new Date();
        gasto.mes = Number(req.body.mes);
        gasto.anio = Number(req.body.anio);
        gasto.nota = req.body.nota;
        gasto.archivos = new Array();
        gasto.archivos.push(archivo);
        gasto.estado = '1';
    
        var rGasto = await gasto.save();    
        if (!rGasto) return res.status(404).send('Gasto No creado.');
        
        //Crear bitacora
        const bitacora = new Bitacora();
        bitacora.usuario = req.body.usuario;
        bitacora.accion = 'Alta de gasto ' + gasto.anio + '/' + gasto.mes + ' casa: ' + gasto.casa;
        bitacora.fecha = new Date();
        bitacora.estado = '1';
        await bitacora.save();

        res.status(200).send({ success: true, payload: rGasto });
    }
    catch(e){
        res.status(404).send("Gasto No creado");
    }
}

gastoCtrl.getGastos = async(req, res) => {
	try{
        var anio = Number(req.query.anio);
        var mI = Number(req.query.mI);
        var mF = Number(req.query.mF);
        var tipos = req.query.tipos.split('@');

        var rGasto = await Gasto.find({anio: anio, estado: '1'})
        .where('mes').gte(mI).lte(mF)
        .where('tipoGasto').in(tipos)
        .select('usuario mes anio tipoGasto importe fechaAlta estado');

        if (!rGasto) return res.status(404).send('Gastos no encontradas.');
        res.status(200).send({ success: true, payload: rGasto });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

gastoCtrl.getGasto = async (req, res) => {
	try{
        const rGasto = await Gasto.findById(req.params.id,{ estado: 0, __v: 0 });
        if (!rGasto) return res.status(404).send('Gasto no encontrada.');
        res.status(200).send({ success: true, payload: rGasto });
    }
    catch(e){
        res.status(404).send("Gasto No encontrada");
    } 
}

gastoCtrl.editGasto = async (req, res) => {
	try{
        const { id } = req.params;
        const gasto = {
            tipoGasto: req.body.tipoGasto,
            importe: req.body.importe,
            mes: req.body.mes,
            anio: req.body.anio,
            nota: req.body.nota,
        };
    
        var rGasto = await Gasto.findByIdAndUpdate(id, {$set: gasto}, {new : true});
        if (!rGasto) return res.status(404).send('Gasto no actualizada.');
        res.status(200).send({ success: true, payload: rGasto._id });
    }
    catch(e){
        res.status(404).send("Gasto No actualizada");
    }
}

gastoCtrl.editGastoImporte = async (req, res) => {
	try{
        const { id } = req.params;
        const gasto = {
            importe: req.body.importe
        };
    
        var rGasto = await Gasto.findByIdAndUpdate(id, {$set: gasto}, {new : true});
        if (!rGasto) return res.status(404).send('Gasto no actualizada.');
        res.status(200).send({ success: true, payload: rGasto._id });
    }
    catch(e){
        res.status(404).send("Gasto No actualizada");
    }
}

gastoCtrl.deleteGasto = async (req, res) => {
	try{
        var rGasto = await Gasto.findByIdAndRemove(req.params.id);
        if (!rGasto) return res.status(404).send('Gasto no eliminada.');

        //Crear bitacora
        const bitacora = new Bitacora();
        bitacora.accion = 'Elimación de gasto ' +  rGasto.anio + '/' + rGasto.mes + ' casa: ' + rGasto.casa;
        bitacora.fecha = new Date();
        bitacora.estado = '1';
        await bitacora.save();

        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Gasto No eliminada");
    }
}

gastoCtrl.eliminarArchivoGasto = async (req, res) => {
	try{
        var id = req.body._id;
        var archivo = req.body.archivoId;
        var url = 'public/uploads/gastos/';

        // delete file named 'sample.txt'
        fs.unlink(url + archivo, function (err) {
            if (err) res.status(404).send("Atrchivo Gasto No eliminado");
        }); 

        var rGasto = await Gasto.findByIdAndUpdate(id, { $pull: { 'archivos': {  _id: archivo } } }, {new : true});

        if (!rGasto) return res.status(404).send('Archivo Gasto no eliminado.');
        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Gasto No eliminada");
    }
}

gastoCtrl.agregarGastoFile = async (req, res) => {
	try{        
        const rGasto = await Gasto.findById(req.body.gasto);
        if (!rGasto) return res.status(404).send('Gasto no encontrada.');
        
        if(rGasto.archivos == null || rGasto.archivos.length == 0) rGasto.archivos = new Array();
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
            rGasto.archivos.push(archivo);
        }
    
        var sGasto = await rGasto.save();    
        if (!sGasto) return res.status(404).send('Archivos de Gastos no creados.');
        res.status(200).send({ success: true, payload: sGasto });
    }
    catch(e){
        res.status(404).send("Archivos de Gastos no creados");
    }
}

module.exports = gastoCtrl;