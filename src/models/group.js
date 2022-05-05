const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nombre: { type: String, required: true },
    integrantes: { type: Number, required: true },
    // fechasApartadas: { type: Number, required: true },
    // preferenciasFechas: { type: String, required: true },
    precioHora: { type: Number, required: true },
    zonaServicio: { type: String, required: true },
    descripcion: { type: String, required: true },
    genero: { type: String, required: true },
});

module.exports = {
    schema,
    model: mongoose.model('Group', schema),
};