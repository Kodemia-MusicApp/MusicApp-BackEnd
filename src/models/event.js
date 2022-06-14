const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Double = require("@mongoosejs/double");

const schema = new Schema({
  titulo: { type: String, required: false },
  localizacion: { type: String, required: false },
  descripcion: { type: String, required: false },
  fechaInicio: { type: Date, required: true },
  horaInicio: { type: String, required: false },
  fechaFinalizacion: { type: Date, required: true },
  horaFinalizacion: { type: String, required: false },
  pago: { type: String, required: false },
  aceptado: { type: Boolean, required: false, default: false },
  cancelado: { type: Boolean, required: false, default: false },
  eventoTerminado: { type: Boolean, required: false, default: false },
  pagoAceptado: { type: Boolean, required: false, default: false },
  clienteId: [
    {
      type: Schema.Types.ObjectId,
      ref: "clientes",
    },
  ],
  musicoId: [
    {
      type: Schema.Types.ObjectId,
      ref: "musicos",
    },
  ],
  colonia: { type: String, required: true },
  calle: { type: String, required: true },
  numero: { type: String, required: true },
  ciudad: { type: String, required: true },
});

module.exports = {
  schema,
  model: mongoose.model("Event", schema),
};
