const mongoose = require('mongoose');
const { Schema } = mongoose;

const GastoSchema = new Schema({
    usuario: { type: String, required: true },
    tipoGasto: { type: String, required: true },
    importe: { type: Number, required: true },
    fechaAlta: { type: Date, required: false },
    mes: { type: Number, required: true },
    anio: { type: Number, required: true },
    archivos: [{
        _id: String,
        nombre: String,
        url: String,
        tipo: String,
        estado: String       
    }],
    nota: { type: String, required: false },
    estado: { type: String, required: true }
});

module.exports = mongoose.model('Gasto', GastoSchema);