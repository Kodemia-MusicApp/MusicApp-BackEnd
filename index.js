const express = require("express");
const app = express();
const port = 8000;
const db = require("./src/lib/db");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log("Welcome to MusicApp");

  db.connect()
    .then(() => {
      console.log("Conectado a la BD");
    })
    .catch((err) => {
      console.log("Conexion fallida");
    });
});
