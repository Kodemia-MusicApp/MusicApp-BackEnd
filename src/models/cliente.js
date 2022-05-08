const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  name:{type:String, required: true},
  lastname:{type:String, required: true},
  secondlastname:{type:String, required: false},
  //imagenusuario:{type:String, required: true},
  password:{type:String, required: true},
  email:{type:String, required:true, unique:true},
  phone:{type:String, required: true},
  paymentmethod:{type:String, required: true},
  estado: { type: String, required:true }
 })

module.exports = {
  schema,
  model: mongoose.model("Cliente", schema),
};


