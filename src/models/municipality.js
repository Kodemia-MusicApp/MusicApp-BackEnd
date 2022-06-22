const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  nombre: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
});

module.exports = {
  schema,
  model: mongoose.model("municipio", schema),
};
