const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: { type: String, required: true },
    localizacion: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    horaInicio: { type: String, required: true },
    fechaFinalizacion: { type: Date, required: true },
    horaFinalizacion: { type: String, required: true },
    contratista: { type: String, required: true },
    contratado: { type: String, required: true },
    pago: { type: String, required: true },
});

module.exports = {
    schema,
    model: mongoose.model('Event', schema),
};