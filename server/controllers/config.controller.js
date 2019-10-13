const Config = require('../models/config');
const configCtrl = {};

configCtrl.getConfig = async(req, res) => {
    try{
        var fConfig = await Config.findOne({main: true});
        if (!fConfig) return res.status(404).send('Configuracion no encontrada.');
        res.status(200).send({ success: true, payload: fConfig });
    }
    catch(e){
        res.status(404).send("Configuracion No encontrada");
    }
}

module.exports = configCtrl;