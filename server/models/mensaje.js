const mongoose = require('mongoose');
const { Schema } = mongoose;

const MensajeSchema = new Schema({
    user: { type: String, required: true },
    admin: { type: String, required: true },
    mensaje: { type: String, required: true },
    fecha: { type: Date, required: true },
    correo: { type: Boolean, required: false },
    estado: { type: String, required: true }
});

module.exports = mongoose.model('Mensaje', MensajeSchema);