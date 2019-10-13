const mongoose = require('mongoose');
const { Schema } = mongoose;

const TipoCuotaSchema = new Schema({
    nombre: { type: String, required: true },
    importe: { type: Number, required: false },
    estado: { type: String, required: false }
});

module.exports = mongoose.model('TipoCuota', TipoCuotaSchema);