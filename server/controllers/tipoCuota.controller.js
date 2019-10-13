const TipoCuota = require('../models/tipoCuota');
const Config = require('../models/config');
const tipoCuotaCtrl = {};

tipoCuotaCtrl.getTiposCuota = async(req, res) => {
	try{
        fTipos = await TipoCuota.find({ "estado": '1' },{ __v: 0 });
        if (!fTipos) return res.status(404).send('Tipos cuota no encontrados.');
        res.status(200).send({ success: true, payload: fTipos });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

tipoCuotaCtrl.getTipoCuota = async (req, res) => {
	try{
        const fTipo = await TipoCuota.findById(req.params.id,{ estado: 0, __v: 0 });
        if (!fTipo) return res.status(404).send('Tipo cuota no encontrado.');
        res.status(200).send({ success: true, payload: fTipo });
    }
    catch(e){
        res.status(404).send("Tipo cuota No creado");
    } 
}

tipoCuotaCtrl.createTipoCuota = async (req, res) => {
	try{        
        const fTipoCuotas = await TipoCuota.findOne({nombre: req.body.nombre});
        if (fTipoCuotas && fTipoCuotas.nombre == req.body.nombre) return res.status(404).send('Tipo cuota ya existe con ese nombre.');

        const tipoCuota = new TipoCuota();
        tipoCuota.nombre = req.body.nombre;
        tipoCuota.importe = req.body.importe;
        TipoCuota.estado = '1';
    
        var rTipoCuota = await tipoCuota.save();    
        if (!rTipoCuota) return res.status(404).send('Tipo cuota No creado.');
        res.status(200).send({ success: true, payload: rTipoCuota });
    }
    catch(e){
        res.status(404).send("Tipo cuota No creado");
    }
}

tipoCuotaCtrl.editTipoCuota = async (req, res) => {
	try{
        const { id } = req.params;
        const tipoCuota = {
            nombre: req.body.nombre,
            importe: req.body.importe
        };
    
        var rTipoCuota = await TipoCuota.findByIdAndUpdate(id, {$set: tipoCuota}, {new : true});
        if (!rTipoCuota) return res.status(404).send('Tipo cuota no actualizado.');
        res.status(200).send({ success: true, payload: rTipoCuota });
    }
    catch(e){
        res.status(404).send("Tipo cuota No actualizado");
    }
}

tipoCuotaCtrl.deleteTipoCuota = async (req, res) => {
	try{
        var rTipoCuota = await TipoCuota.findByIdAndRemove(req.params.id);
        if (!rTipoCuota) return res.status(404).send('Tipo cuota no eliminado.');
        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Tipo cuota No eliminado");
    }
}

tipoCuotaCtrl.cambiarEstadoTipoCuota = async (req, res) => {
	try{
        const id = req.body._id;
        const tipoCuota = {
            estado: req.body.estado
        };
        var rTipoCuota = await TipoCuota.findByIdAndUpdate(id, {$set: tipoCuota}, {new : true});
        if (!rTipoCuota) return res.status(404).send('Tipo cuota no actualizado.');
        res.status(200).send({ success: true, payload: rTipoCuota });
    }
    catch(e){
        res.status(404).send("Tipo cuota No actualizado");
    }    
}

module.exports = tipoCuotaCtrl;