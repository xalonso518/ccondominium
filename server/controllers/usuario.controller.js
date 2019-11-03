const Usuario = require('../models/usuario');
const Config = require('../models/config');
const Mensaje = require('../models/mensaje');
const bcrypt = require('bcryptjs');
const sendGrid = require('../utils/sendGrid');
const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async(req, res) => {
	try{
        let faltantes = req.query.faltantes;
        var fUsuarios = {};
        if(faltantes == "1") fUsuarios = await Usuario.find({ "casa": '' },{ pass: 0, __v: 0 });
        else fUsuarios = await Usuario.find({},{ pass: 0, __v: 0 });
        if (!fUsuarios) return res.status(404).send('Usuarios no encontrados.');
        res.status(200).send({ success: true, payload: fUsuarios });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

usuarioCtrl.getUsuariosCasa = async(req, res) => {
	try{
        let casa = req.query.casa;
        var fUsuarios = {};
        fUsuarios = await Usuario.find({ "casa": casa, "estado": "1" },{ pass: 0, __v: 0 });
        if (!fUsuarios) return res.status(404).send('Usuarios no encontrados.');
        res.status(200).send({ success: true, payload: fUsuarios });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

usuarioCtrl.getUsuario = async (req, res) => {
	try{
        const fUsuarios = await Usuario.findById(req.params.id,{ pass: 0, __v: 0 });
        if (!fUsuarios) return res.status(404).send('Usuario no encontrado.');
        res.status(200).send({ success: true, payload: fUsuarios });
    }
    catch(e){
        res.status(404).send("Usuario No creado");
    } 
}

usuarioCtrl.createUsuario = async (req, res) => {
	try{        
        const fUsuarios = await Usuario.findOne({user: req.body.user});
        if (fUsuarios && fUsuarios.user == req.body.user) return res.status(404).send('Usuario ya creado.');

        var hashedPassword = bcrypt.hashSync("condominio", 8);
        const usuario = new Usuario();
        usuario.user = req.body.user;
        usuario.pass = hashedPassword;
        usuario.nombre = req.body.nombre;
        usuario.casa = req.body.casa;
        usuario.telefono = req.body.telefono;
        usuario.fechaIngreso = req.body.fechaIngreso;
        usuario.tipo = req.body.tipo;
        usuario.estado = '1';
        usuario.imagen = '';
    
        var rUsuario = await usuario.save();    
        if (!rUsuario) return res.status(404).send('Usuario No creado.');
        res.status(200).send({ success: true, payload: rUsuario });
    }
    catch(e){
        res.status(404).send("Usuario No creado");
    }
}

usuarioCtrl.editUsuario = async (req, res) => {
	try{
        const { id } = req.params;
        const usuario = {
            nombre: req.body.nombre,
            casa: req.body.casa,
            telefono: req.body.telefono,
            fechaIngreso: req.body.fechaIngreso,
            tipo: req.body.tipo
        };
    
        var rUsuario = await Usuario.findByIdAndUpdate(id, {$set: usuario}, {new : true});
        if (!rUsuario) return res.status(404).send('Usuario no actualizado.');
        res.status(200).send({ success: true, payload: rUsuario });
    }
    catch(e){
        res.status(404).send("Usuario No actualizado");
    }
}

usuarioCtrl.deleteUsuario = async (req, res) => {
	try{
        var rUsuario = await Usuario.findByIdAndRemove(req.params.id);
        if (!rUsuario) return res.status(404).send('Usuario no eliminado.');
        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Usuario No eliminado");
    }
}

usuarioCtrl.getUserData = async(req, res) => {
	try{
        var fUsuario = await Usuario.findOne({ user: req.body.UserName },{ pass: 0, estado: 0 });
        if (!fUsuario) return res.status(404).send('Usuario no encontrado.');
        res.status(200).send({ success: true, payload: fUsuario });
    }
    catch(e){
        res.status(404).send("Usuario No encontrado");
    }        
}

usuarioCtrl.cambiarEstadoUsuario = async (req, res) => {
	try{
        const id = req.body._id;
        const usuario = {
            estado: req.body.estado
        };
        var rUsuario = await Usuario.findByIdAndUpdate(id, {$set: usuario}, {new : true});
        if (!rUsuario) return res.status(404).send('Usuario no actualizado.');
        res.status(200).send({ success: true, payload: rUsuario });
    }
    catch(e){
        res.status(404).send("Usuario No actualizado");
    }    
}

usuarioCtrl.enviarMensaje = async (req, res) => {
	try{
        const mensaje = new Mensaje();
        mensaje.user = req.body.user;
        mensaje.admin = req.body.admin;
        mensaje.mensaje = req.body.mensaje;
        mensaje.fecha = new Date();
        mensaje.correo = req.body.correo;
        mensaje.estado = '1';
        
        if(req.body.correo) {
            var fConfig = await Config.findOne({main: true});
            if (!fConfig) return res.status(404).send('Error al enviar el correo. (Sin config)');
            await sendGrid.sendMailMensaje(mensaje.user, mensaje.mensaje, fConfig.link); 
        }
    
        var rMensaje = await mensaje.save();    
        if (!rMensaje) return res.status(404).send('Mensaje creado.');
        res.status(200).send({ success: true, payload: rMensaje });
    }
    catch(e){
        res.status(404).send("Mensaje No creado");
    }          
}

usuarioCtrl.enviarInvitacion = async (req, res) => {
    try{
        const user = req.body.user;
        var fConfig = await Config.findOne({main: true});
        if (!fConfig) return res.status(404).send('Error al enviar el correo. (Sin config)');
    
        var rMail = await sendGrid.sendMailBienvenida(user, fConfig.nombre, fConfig.link);
        if (rMail) res.status(200).send({ success: true, payload: 'OK' });
        else res.status(404).send("Error al enviar el correo");
    }
    catch(e){
        res.status(404).send("Correo No creado");
    }
}

//Editar perfil
usuarioCtrl.editPerfilUsuario = async (req, res) => {
	try{    
        const { id } = req.params;
        var nUsuario = {};
        if(req.body.pass != undefined && req.body.pass != ''){
            var hashedPassword = req.body.pass;
            nUsuario = {
                nombre: req.body.nombre,
                casa: req.body.casa,
                telefono: req.body.telefono,
                pass: hashedPassword
            };
        }else{
            nUsuario = {
                nombre: req.body.nombre,
                casa: req.body.casa,
                telefono: req.body.telefono
            };
        }
    
        var rUpdate = await Usuario.findByIdAndUpdate(id, {$set: nUsuario}, {new : true});
        if (!rUpdate) return res.status(404).send('Datos no actualizados');
        return res.json({success: true, payload: rUpdate});
    }
    catch(e){
        res.status(404).send("Perfil No editado");
    }
}

// Get perfil
usuarioCtrl.getPerfilUsuario = async(req, res) => {
    const { id } = req.params;
    var fUsuario = await Usuario.findById({ _id: id },{ pass: 0, estado: 0, user: 0, tipo: 0 });
    if (!fUsuario) return res.status(404).send('No user found.');
    res.status(200).send({ success: true, payload: fUsuario });
}

//Set img perfil
usuarioCtrl.setPerfilImagen = async(req, res) => {
	try{
        const { id } = req.params;
        var dirImg = req.file.path.replace(/\\/g,'/');
        var nUsuario = {
            imagen: dirImg
        };
    
        var rUpdate = await Usuario.findByIdAndUpdate(id, {$set: nUsuario}, {new : true});
        if(rUpdate) res.status(200).send({ success: true, payload: dirImg });
        else return res.status(404).send('Datos no actualizados');
    }
    catch(e){
        res.status(404).send("Imagen perfil no actualizada");
    }
}

module.exports = usuarioCtrl;