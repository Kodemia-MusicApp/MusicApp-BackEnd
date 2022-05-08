const express = require("express");
const app = express();
const port = 8000;
const db = require("./src/lib/db");
const cors = require("cors");
const apiRouter = require("./src/routes");

app.use(express.json());
apiRouter(app);
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
