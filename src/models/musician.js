const mongoose = require("mongoose");
const Double = require("@mongoosejs/double");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  secondlastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  oculto: { type: Boolean, default: false, required: false },
  descripcion: { type: String, required: false, default: "" },
  tipoMusico: { type: String, required: false, default: "Musico" },
  genero: { type: String, required: false, default: "versatil" },
  phone: { type: Number, required: false, default: 44 },
  nombreArtistico: { type: String, required: false, default: "" },
  horarioDiaUno: { type: String, required: false, default: "Lunes" },
  horarioDiaDos: { type: String, required: false, default: "Domingo" },
  horarioInicio: { type: String, required: false, default: "00:00" },
  horarioFin: { type: String, required: false, default: "24:00" },
  cobroPorHora: { type: String, required: false, default: "1.0" },
  imagenMusico: {
    type: String,
    required: false,
    default:
      "https://images.unsplash.com/photo-1567021892994-278ad3f489f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  estado: { type: String, required: false, default: "CDMX" },
  municipio: { type: String, required: false, default: "CDMX" },
});

module.exports = {
  schema,
  model: mongoose.model("musicos", schema),
};
