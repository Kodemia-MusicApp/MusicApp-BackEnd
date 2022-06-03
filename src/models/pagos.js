const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  quienpago:{type:String, required: true},
  fechapago:{type:String, required: true},
  idpago:{type:String, required: false},
  artistacontratado:{type:String, required: true},
 })



module.exports = {
  schema,
  model: mongoose.model("Pago", schema),
};


