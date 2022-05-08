const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  nombre: { type: String, required: true },
  apellidoPaterno: { type: String, required: true },
  apellidoMaterno: { type: String, required: true },
  correo: { type: String, required: true, unique: true, index: true },
  contrasenia: { type: String, required: true },
  oculto: { type: Boolean, default: false, required: false },
  descripcion: { type: String, required: false },
  tipoMusico: { type: String, required: false },
});

module.exports = {
  schema,
  model: mongoose.model("musicos", schema),
};
