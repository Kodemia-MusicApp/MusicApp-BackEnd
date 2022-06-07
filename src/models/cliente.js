const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  secondlastname: { type: String, required: false },
  imagenusuario: {
    type: String,
    required: false,
    default:
      "https://previews.123rf.com/images/thesomeday123/thesomeday1231709/thesomeday123170900021/85622928-icono-de-perfil-de-avatar-predeterminado-marcador-de-posici%C3%B3n-de-foto-gris-vectores-de-ilustraciones.jpg?fj=1",
  },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: false, default: 44444 },
  paymentmethod: { type: String, required: false },
  estado: { type: String, required: true, default: "CDMX" },
  tipo: { type: String, required: false, default: "Client" },
});

module.exports = {
  schema,
  model: mongoose.model("clientes", schema),
};
