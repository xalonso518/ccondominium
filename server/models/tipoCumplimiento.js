const mongoose = require('mongoose');
const { Schema } = mongoose;

const TipoCumplimientoSchema = new Schema({
    nombre: { type: String, required: true },
    importe: { type: Number, required: false },
    nivel: { type: String, required: false },
    estado: { type: String, required: false }
});

module.exports = mongoose.model('TipoCumplimiento', TipoCumplimientoSchema);