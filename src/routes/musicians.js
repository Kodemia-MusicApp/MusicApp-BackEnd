const router = require("express").Router();
const musician = require("../useCases/musician");
const jwt = require("../lib/jwt");
const { authHandler } = require("../middlewares/authHandler");

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
    const userId = await musician.getByEmail(correo);
    const token = await jwt.sign({
      _id: userId._id,
      type: userId.tipoMusico,
    });
    res.json({
      success: true,
      payload: token,
      id: userId._id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      succes: false,
    });
  }
});

router.get("/:id", authHandler, async (req, res, next) => {
  //console.log("entra");
  try {
    res.json({
      message: "Success",
    });
  } catch (error) {}
});

router.get("/:correo", authHandler, async (req, res, next) => {
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

router.patch("/:correo", authHandler, async (req, res, next) => {
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

router.delete("/:correo", authHandler, async (req, res, next) => {
  try {
    const { correo } = req.params;
    const delMusician = await musician.del(correo);
    res.json({
      succes: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
