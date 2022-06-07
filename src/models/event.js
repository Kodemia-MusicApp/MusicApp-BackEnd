const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Double = require("@mongoosejs/double");

const schema = new Schema({
  titulo: { type: String, required: true },
  localizacion: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  horaInicio: { type: String, required: true },
  fechaFinalizacion: { type: Date, required: true },
  horaFinalizacion: { type: String, required: true },
  pago: { type: String, required: true },
  aceptado: { type: Boolean, required: false, default: false },
  calcelado: { type: Boolean, required: false, default: false },
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
});

module.exports = {
  schema,
  model: mongoose.model("Event", schema),
};
