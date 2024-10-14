const express = require("express");
const app = express();
const config = require("./src/lib/config");
const db = require("./src/lib/db");
const cors = require("cors");
const apiRouter = require("./src/routes");

app.use(express.json());
app.use(cors({
  origin: /\.onrender\.com$/,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",}
));
apiRouter(app);
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log(`Welcome to MusicApp ${PORT}`);

  db.connect()
    .then(() => {
      console.log("Conectado a la BD");
    })
    .catch((err) => {
      console.log("Conexion fallida");
    });
});
