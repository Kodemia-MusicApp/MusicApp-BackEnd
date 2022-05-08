const router = require("express").Router();
const musician = require("../useCases/musician");

router.post("/", async (req, res, next) => {
  try {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasenia,
      descripcion,
      tipoMusico,
    } = req.body;
    const creaMusician = await musician.creaMusico(
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasenia,
      descripcion,
      tipoMusico
    );
    res.json({
      success: true,
      payload: creaMusician,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  console.log("entra");
  try {
    res.json({
      message: "Entra",
    });
  } catch (error) {}
});

router.get("/:id", async (req, res, next) => {
  console.log("Entra get id");
});

router.post("/", async (req, res, next) => {
  console.log("Entra post");
});

module.exports = router;
