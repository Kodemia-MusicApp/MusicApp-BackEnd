const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  nameState: { type: String, required: true, unique: true },
});

module.exports = {
  schema,
  model: mongoose.model("estado", schema),
};
