const express = require("express");
const app = express();
const config = require("./src/lib/config");
const db = require("./src/lib/db");
const cors = require("cors");
const apiRouter = require("./src/routes");

app.use(express.json());
app.use(cors());
apiRouter(app);
app.listen(process.env.APP_PORT || 3001, "0.0.0.0", () => {
  console.log(`Welcome to MusicApp ${process.env.APP_PORT}`);

  db.connect()
    .then(() => {
      console.log("Conectado a la BD");
    })
    .catch((err) => {
      console.log("Conexion fallida");
    });
});
