const mongoose = require('mongoose');
const { Schema} = mongoose;

const ConfigSchema = new Schema({
    nombre: { type: String, required: true },
    cuotaMensual: { type: Number, required: false },
    otroCuotaMensual: { type: Number, required: false },
    casas: { type: Number, required: false },
    main: { type: Boolean, required: false },
    link: { type: String, required: true },
});

module.exports = mongoose.model('Config', ConfigSchema);