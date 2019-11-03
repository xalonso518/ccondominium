const mongoose = require('mongoose');
const { Schema } = mongoose;

const TipoGastoSchema = new Schema({
    nombre: { type: String, required: true },
    importe: { type: Number, required: false },
    proveedor: { type: String, required: false },
    telefono: { type: String, required: false },
    direccion: { type: String, required: false },
    estado: { type: String, required: false }
});

module.exports = mongoose.model('TipoGasto', TipoGastoSchema);