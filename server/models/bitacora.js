const mongoose = require('mongoose');
const { Schema } = mongoose;

const BitacoraSchema = new Schema({
    accion: { type: String, required: true },
    fecha: { type: Date, required: true },
    estado: { type: String, required: true }
});

module.exports = mongoose.model('Bitacora', BitacoraSchema);