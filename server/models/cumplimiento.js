const mongoose = require('mongoose');
const { Schema } = mongoose;

const CumplimientoSchema = new Schema({
    usuario: { type: String, required: true },
    casa: { type: String, required: true },
    tipoCumplimiento: { type: String, required: true },
    importe: { type: Number, required: true },
    nivel: { type: String, required: true },
    fechaAlta: { type: Date, required: false },
    mes: { type: Number, required: true },
    anio: { type: Number, required: true },
    nota: { type: String, required: false },
    estado: { type: String, required: true }
});

module.exports = mongoose.model('Cumplimiento', CumplimientoSchema);