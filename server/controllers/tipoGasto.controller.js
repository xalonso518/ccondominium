const TipoGasto = require('../models/tipoGasto');
const tipoGastoCtrl = {};

tipoGastoCtrl.getTiposGastoTodos = async(req, res) => {
	try{
        fTipos = await TipoGasto.find({ },{ __v: 0 }).sort('-nombre');;
        if (!fTipos) return res.status(404).send('Tipos Gasto no encontrados.');
        res.status(200).send({ success: true, payload: fTipos });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

tipoGastoCtrl.getTiposGasto = async(req, res) => {
	try{
        fTipos = await TipoGasto.find({ "estado": '1' },{ __v: 0 }).sort('-nombre');;
        if (!fTipos) return res.status(404).send('Tipos Gasto no encontrados.');
        res.status(200).send({ success: true, payload: fTipos });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

tipoGastoCtrl.getTipoGasto = async (req, res) => {
	try{
        const fTipo = await TipoGasto.findById(req.params.id,{ estado: 0, __v: 0 });
        if (!fTipo) return res.status(404).send('Tipo Gasto no encontrado.');
        res.status(200).send({ success: true, payload: fTipo });
    }
    catch(e){
        res.status(404).send("Tipo Gasto No creado");
    } 
}

tipoGastoCtrl.createTipoGasto = async (req, res) => {
	try{        
        const fTipoGastos = await TipoGasto.findOne({nombre: req.body.nombre});
        if (fTipoGastos && fTipoGastos.nombre == req.body.nombre) return res.status(404).send('Tipo Gasto ya existe con ese nombre.');

        const tipoGasto = new TipoGasto();
        tipoGasto.nombre = req.body.nombre;
        tipoGasto.importe = req.body.importe;
        tipoGasto.proveedor = req.body.proveedor;
        tipoGasto.telefono = req.body.telefono;
        tipoGasto.direccion = req.body.direccion;
        tipoGasto.estado = '1';
    
        var rTipoGasto = await tipoGasto.save();    
        if (!rTipoGasto) return res.status(404).send('Tipo Gasto No creado.');
        res.status(200).send({ success: true, payload: rTipoGasto });
    }
    catch(e){
        res.status(404).send("Tipo Gasto No creado");
    }
}

tipoGastoCtrl.editTipoGasto = async (req, res) => {
	try{
        const { id } = req.params;
        const tipoGasto = {
            nombre: req.body.nombre,
            proveedor: req.body.proveedor,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            importe: req.body.importe
        };
    
        var rTipoGasto = await TipoGasto.findByIdAndUpdate(id, {$set: tipoGasto}, {new : true});
        if (!rTipoGasto) return res.status(404).send('Tipo Gasto no actualizado.');
        res.status(200).send({ success: true, payload: rTipoGasto });
    }
    catch(e){
        res.status(404).send("Tipo Gasto No actualizado");
    }
}

tipoGastoCtrl.deleteTipoGasto = async (req, res) => {
	try{
        var rTipoGasto = await TipoGasto.findByIdAndRemove(req.params.id);
        if (!rTipoGasto) return res.status(404).send('Tipo Gasto no eliminado.');
        res.status(200).send({ success: true, payload: "ok" });
    }
    catch(e){
        res.status(404).send("Tipo Gasto No eliminado");
    }
}

tipoGastoCtrl.cambiarEstadoTipoGasto = async (req, res) => {
	try{
        const id = req.body._id;
        const tipoGasto = {
            estado: req.body.estado
        };
        var rTipoGasto = await TipoGasto.findByIdAndUpdate(id, {$set: tipoGasto}, {new : true});
        if (!rTipoGasto) return res.status(404).send('Tipo Gasto no actualizado.');
        res.status(200).send({ success: true, payload: rTipoGasto });
    }
    catch(e){
        res.status(404).send("Tipo Gasto No actualizado");
    }    
}

module.exports = tipoGastoCtrl;