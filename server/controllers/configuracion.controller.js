const Config = require('../models/config');
const configuracionCtrl = {};

configuracionCtrl.getConfiguracion = async(req, res) => {
	try{
        var rBitacoras = await Config.findOne();
        if (!rBitacoras) return res.status(404).send('Configuracion no encontrada.');
        res.status(200).send({ success: true, payload: rBitacoras });
    }
    catch(e){
        res.status(404).send("Problemas de conexion");
    }
}

configuracionCtrl.editConfiguracion = async (req, res) => {
	try{
        const { id } = req.params;
        const config = {
            nombre: req.body.nombre,
            casas: req.body.casas,
            link: req.body.link
        };
    
        var rConfig = await Config.findByIdAndUpdate(id, {$set: config}, {new : true});
        if (!rConfig) return res.status(404).send('Configuración no actualizada.');
        res.status(200).send({ success: true, payload: rConfig });
    }
    catch(e){
        res.status(404).send("Configuración no actualizada");
    }
}

module.exports = configuracionCtrl;