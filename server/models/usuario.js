const mongoose = require('mongoose');
const { Schema} = mongoose;

const UsuarioSchema = new Schema({
    user: { type: String, required: true },
    pass: { type: String, required: true },
    nombre: { type: String, required: true },
    casa: { type: String, required: false },
    telefono: { type: String, required: false },
    fechaIngreso: { type: Date, required: false },
    imagen: { type: String, required: false },
    tipo: { type: String, required: false },
    estado: { type: String, required: false },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);