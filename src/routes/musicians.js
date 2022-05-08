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

router.get("/:correo", async (req, res, next) => {
  try {
    const { correo } = req.params;
    const musicians = await musician.getByEmail(correo);
    if (musicians == null) {
      res.json({
        success: false,
      });
    } else {
      res.json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:correo", async (req, res, next) => {
  try {
    const { correo } = req.params;
    const updateMusician = await musician.patch(correo, { ...req.body });
    res.json({
      succes: true,
      payload: updateMusician,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
