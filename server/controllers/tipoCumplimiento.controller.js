const TipoCumplimiento = require('../models/tipoCumplimiento');
const tipoCumplimientoCtrl = {};

tipoCumplimientoCtrl.getTiposCumplimientoTodos = async(req, res) => {
	try{
        fTipos = await TipoCumplimiento.find({ },{ __v: 0 });
        if (!fTipos) return res.status(404).send('Tipos Cumplimiento no encontrados.');
        res.status(200).send({ success: true, payload: fTipos });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

tipoCumplimientoCtrl.getTiposCumplimiento = async(req, res) => {
	try{
        fTipos = await TipoCumplimiento.find({ "estado": '1' },{ __v: 0 });
        if (!fTipos) return res.status(404).send('Tipos Cumplimiento no encontrados.');
        res.status(200).send({ success: true, payload: fTipos });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

tipoCumplimientoCtrl.getTipoCumplimiento = async (req, res) => {
	try{
        const fTipo = await TipoCumplimiento.findById(req.params.id,{ estado: 0, __v: 0 });
        if (!fTipo) return res.status(404).send('Tipo Cumplimiento no encontrado.');
        res.status(200).send({ success: true, payload: fTipo });
    }
    catch(e){
        res.status(404).send("Tipo Cumplimiento No creado");
    } 
}

tipoCumplimientoCtrl.createTipoCumplimiento = async (req, res) => {
	try{        
        const fTipoCumplimientos = await TipoCumplimiento.findOne({nombre: req.body.nombre});
        if (fTipoCumplimientos && fTipoCumplimientos.nombre == req.body.nombre) return res.status(404).send('Tipo Cumplimiento ya existe con ese nombre.');

        const tipoCumplimiento = new TipoCumplimiento();
        tipoCumplimiento.nombre = req.body.nombre;
        tipoCumplimiento.importe = req.body.importe;
        tipoCumplimiento.nivel = req.body.nivel;
        tipoCumplimiento.estado = '1';
    
        var rTipoCumplimiento = await tipoCumplimiento.save();    
        if (!rTipoCumplimiento) return res.status(404).send('Tipo Cumplimiento No creado.');
        res.status(200).send({ success: true, payload: rTipoCumplimiento });
    }
    catch(e){
        res.status(404).send("Tipo Cumplimiento No creado");
    }
}

tipoCumplimientoCtrl.editTipoCumplimiento = async (req, res) => {
	try{
        const { id } = req.params;
        const tipoCumplimiento = {
            nombre: req.body.nombre,
            nivel: req.body.nivel,
            importe: req.body.importe
        };
    
        var rTipoCumplimiento = await TipoCumplimiento.findByIdAndUpdate(id, {$set: tipoCumplimiento}, {new : true});
        if (!rTipoCumplimiento) return res.status(404).send('Tipo Cumplimiento no actualizado.');
        res.status(200).send({ success: true, payload: rTipoCumplimiento });
    }
    catch(e){
        res.status(404).send("Tipo Cumplimiento No actualizado");
    }
}

tipoCumplimientoCtrl.deleteTipoCumplimiento = async (req, res) => {
	try{
        var rTipoCumplimiento = await TipoCumplimiento.findByIdAndRemove(req.params.id);
        if (!rTipoCumplimiento) return res.status(404).send('Tipo Cumplimiento no eliminado.');
        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Tipo Cumplimiento No eliminado");
    }
}

tipoCumplimientoCtrl.cambiarEstadoTipoCumplimiento = async (req, res) => {
	try{
        const id = req.body._id;
        const tipoCumplimiento = {
            estado: req.body.estado
        };
        var rTipoCumplimiento = await TipoCumplimiento.findByIdAndUpdate(id, {$set: tipoCumplimiento}, {new : true});
        if (!rTipoCumplimiento) return res.status(404).send('Tipo Cumplimiento no actualizado.');
        res.status(200).send({ success: true, payload: rTipoCumplimiento });
    }
    catch(e){
        res.status(404).send("Tipo Cumplimiento No actualizado");
    }    
}

module.exports = tipoCumplimientoCtrl;