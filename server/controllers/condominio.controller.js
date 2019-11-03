const Bitacora = require('../models/bitacora');
const Mensaje = require('../models/mensaje');
const Aviso = require('../models/aviso');
const Usuario = require('../models/usuario');
const Config = require('../models/config');
const sendGrid = require('../utils/sendGrid');
const condominioCtrl = {};
const fs = require('fs');
const path = require('path');

condominioCtrl.getBitacoras = async(req, res) => {
	try{
        var fechaInicio = new Date(req.query.fechaInicio);
        var fechaFinal = new Date(req.query.fechaFinal);
        var fFinal = new Date(fechaFinal.setHours(fechaFinal.getHours() + fechaFinal.getHours() + (fechaFinal.getTimezoneOffset() / 60)));
        fechaInicio.setHours(0);

        var rBitacoras = await Bitacora.find({fecha: { '$gte': fechaInicio, '$lte': fFinal }});
        if (!rBitacoras) return res.status(404).send('Bitacoras no encontradas.');
        res.status(200).send({ success: true, payload: rBitacoras });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

condominioCtrl.getMensajes = async(req, res) => {
	try{
        var fechaInicio = new Date(req.query.fechaInicio);
        var fechaFinal = new Date(req.query.fechaFinal);
        var fFinal = new Date(fechaFinal.setHours(fechaFinal.getHours() + fechaFinal.getHours() + (fechaFinal.getTimezoneOffset() / 60)));
        fechaInicio.setHours(0);

        var rMensajes = await Mensaje.find({fecha: { '$gte': fechaInicio, '$lte': fFinal }});
        if (!rMensajes) return res.status(404).send('Mensajes no encontrados.');
        res.status(200).send({ success: true, payload: rMensajes });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

condominioCtrl.getAvisos = async(req, res) => {
	try{
        var fechaInicio = new Date(req.query.fechaInicio);
        var fechaFinal = new Date(req.query.fechaFinal);
        var fFinal = new Date(fechaFinal.setHours(fechaFinal.getHours() + fechaFinal.getHours() + (fechaFinal.getTimezoneOffset() / 60)));
        fechaInicio.setHours(0);

        var rAvisos = await Aviso.find({fecha: { '$gte': fechaInicio, '$lte': fFinal }});
        if (!rAvisos) return res.status(404).send('Avisos no encontrados.');
        res.status(200).send({ success: true, payload: rAvisos });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

condominioCtrl.createAviso = async (req, res) => {
	try{
        const aviso = new Aviso();
        aviso.fecha = new Date();
        aviso.mensaje = req.body.mensaje;
        aviso.correo = req.body.correo;
        aviso.prioridad = req.body.prioridad;
        aviso.admin = req.body.admin;
        aviso.estado = '1';
            
        var rAviso = await aviso.save();    
        if (!rAviso) return res.status(404).send('Aviso No creado.');

        if(aviso.correo){
            try{
                var fUsuarios = await Usuario.find({"estado": "1" },{ user: 1, estado: 1 });
                if (!fUsuarios) return res.status(404).send('Aviso creado, pero hubo un error al enviar el correo');
                
                var fConfig = await Config.findOne({main: true});
                if (!fConfig) return res.status(404).send('Aviso creado, pero hubo un error al enviar el correo');
            
                var rMail = await sendGrid.sendMailAviso(fUsuarios, fConfig.nombre, fConfig.link);
                if (!rMail) return res.status(404).send('Aviso creado, pero hubo un error al enviar el correo');            
            }
            catch(e){
                res.status(404).send("Aviso creado, pero hubo un error al enviar el correo");
            }            
        }
        res.status(200).send({ success: true, payload: rAviso });
    }
    catch(e){
        res.status(404).send("Aviso No creado");
    }
}

module.exports = condominioCtrl;