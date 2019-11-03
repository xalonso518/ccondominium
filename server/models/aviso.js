const mongoose = require('mongoose');
const { Schema } = mongoose;

const AvisoSchema = new Schema({
    admin: { type: String, required: true },
    mensaje: { type: String, required: true },
    prioridad: { type: String, required: true },
    fecha: { type: Date, required: true },
    correo: { type: Boolean, required: false },
    estado: { type: String, required: true }
});

module.exports = mongoose.model('Aviso', AvisoSchema);