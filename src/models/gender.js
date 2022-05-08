const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nombre: { type: String, required: true, unique: true },
});

module.exports = {
    schema,
    model: mongoose.model('Genero', schema)
};