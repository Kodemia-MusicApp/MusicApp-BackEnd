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
  estado: { type: String, required: false, default: "CDMX" },
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
      "https://previews.123rf.com/images/thesomeday123/thesomeday1231709/thesomeday123170900021/85622928-icono-de-perfil-de-avatar-predeterminado-marcador-de-posici%C3%B3n-de-foto-gris-vectores-de-ilustraciones.jpg?fj=1",
  },
});

module.exports = {
  schema,
  model: mongoose.model("musicos", schema),
};
