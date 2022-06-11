const express = require("express");
const musician = require("../useCases/musician");
const client = require("../useCases/client");
const jwt = require("../lib/jwt");
const { verify } = require("jsonwebtoken");
const { authHandler } = require("../middlewares/authHandler");

const router = express.Router();

router.post("/login/musician", async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const retrievedUser = await musician.getByEmail(correo);
    const isMatch = await musician.authenticate(retrievedUser, password);
    if (isMatch) {
      const token = await jwt.sign({
        _id: retrievedUser._id,
        type: retrievedUser.tipoMusico,
      });
      res.json({
        success: true,
        message: "Login exitoso",
        payload: [
          {
            token: token,
            imagenMusico: retrievedUser.imagenMusico,
            name: retrievedUser.name,
            lastname: retrievedUser.lastname,
            secondlastname: retrievedUser.secondlastname,
            type: retrievedUser.tipoMusico,
          },
        ],
      });
    } else {
      res.status(403).json({
        success: false,
        message: "correo o contraseña incorrectos",
      });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "correo o contraseña incorrectos",
    });
    next(error);
  }
});

router.post("/login/clients", async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const retrievedUser = await client.getByEmail(correo);
    const isMatch = await client.authenticate(retrievedUser, password);
    if (isMatch) {
      const token = await jwt.sign({
        _id: retrievedUser._id,
        type: retrievedUser.tipo,
      });
      res.json({
        success: true,
        message: "Login exitoso",
        payload: [
          {
            token: token,
            imagenusuario: retrievedUser.imagenusuario,
            name: retrievedUser.name,
            type: retrievedUser.tipo,
            lastname: retrievedUser.lastname,
            secondlastname: retrievedUser.secondlastname,
          },
        ],
      });
    } else {
      res.status(403).json({
        success: false,
        message: "correo o contraseña incorrectos",
      });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "correo o contraseña incorrectos",
    });
    next(error);
  }
});

router.post("/login/verify", authHandler, async (req, res, next) => {
  const { type, _id } = req.params.tokenPayload;

  try {
    const retrievedCLient = await client.getById(_id);
    const retrievedMusician = await musician.getById(_id);
    if (retrievedMusician != null) {
      res.json({
        success: true,
        payload: [
          {
            name: retrievedMusician.name,
            lastname: retrievedMusician.lastname,
            secondlastname: retrievedMusician.secondlastname,
            type: retrievedMusician.tipoMusico,
            imagenusuario: retrievedMusician.imagenMusico,
          },
        ],
      });
    }
    if (retrievedCLient != null) {
      res.json({
        success: true,
        payload: [
          {
            name: retrievedCLient.name,
            lastname: retrievedCLient.lastname,
            secondlastname: retrievedCLient.secondlastname,
            type: retrievedCLient.tipoMusico,
            imagenusuario: retrievedCLient.imagenusuario,
          },
        ],
      });
    }
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
