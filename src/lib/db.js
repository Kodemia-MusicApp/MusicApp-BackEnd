const mongoose = require("mongoose");
const config = require("./config");

const connect = () => {
  const dbConexion = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.baseCollection}?retryWrites=true&w=majority`;

  return new Promise((resolve, reject) => {
    mongoose.connect(dbConexion, { useNewUrlParser: true });
    const db = mongoose.connection;

    db.on("open", () => {
      console.log("Conexion a la BD");
      resolve(mongoose);
    });

    db.on("error", (err) => {
      console.log("Conexion fallida", err);
      reject(err);
    });
  });
};

module.exports = { connect };
